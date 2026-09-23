---
name: stripe-payments
description: >-
  Conventions maison pour implémenter ou modifier un flux de paiement Stripe :
  Checkout Sessions, Payment Intents, vérification de signature des webhooks,
  cycle de vie des abonnements, remboursements, clés d'idempotence, clés de test
  vs prod. À utiliser dès qu'une tâche touche à la facturation, au paiement, aux
  abonnements ou à l'API Stripe.
---

# Stripe — implémentation d'un paiement

## Quand utiliser ce skill
Toute tâche qui crée ou modifie : un tunnel de paiement, un abonnement, un
webhook Stripe, un remboursement, une page de pricing branchée sur Stripe.

## Étapes
1. **Repérer l'existant** : y a-t-il déjà un client Stripe initialisé, un dossier
   `payments/` / `billing/`, un handler de webhook ? T'aligner dessus.
2. **Clés** : lues depuis l'environnement (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`).
   Jamais de clé en dur, jamais de clé committée. En dev, clés `sk_test_…`.
3. **Créer le paiement côté serveur uniquement** : Checkout Session ou Payment
   Intent créé par une route serveur, jamais depuis le client. Le client ne
   reçoit qu'un `client_secret` ou une URL de redirection.
4. **Idempotence** : toute création de ressource passe par un
   `idempotencyKey` stable (id de commande, id de ticket) pour survivre à un retry.
5. **Webhooks** : vérifier la signature avec `stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)`
   sur le **corps brut** (pas le JSON parsé). Répondre `2xx` vite, traiter en
   asynchrone si le travail est long. Gérer l'événement comme **au moins une
   fois** (dédup par `event.id`).
6. **Source de vérité = Stripe**, pas le retour du client : l'état d'une commande
   passe à « payée » sur réception du webhook `checkout.session.completed` /
   `payment_intent.succeeded`, pas sur la redirection de succès.
7. **Montants** en plus petite unité (centimes), en entier, avec la devise explicite.
8. **Ne jamais stocker** de numéro de carte / CVC / données PAN. On stocke des
   identifiants Stripe (`customer`, `payment_intent`, `subscription`).
9. **Erreurs** : distinguer erreur carte (`card_declined`, `expired_card` →
   message utilisateur actionnable) et erreur technique (→ log + 5xx + retry).
10. **Tests** : mocker le SDK Stripe (voir la règle tests mockés). Couvrir au
    minimum : création OK, carte refusée, webhook signé accepté, webhook mal
    signé rejeté, double réception du même `event.id`.

## Abonnements
- Créer/mettre à jour via `Subscription` ; refléter localement seulement l'état
  utile (`status`, `current_period_end`, `price`).
- Réagir aux webhooks `customer.subscription.updated|deleted`,
  `invoice.paid`, `invoice.payment_failed`.
- Prévoir la période d'essai, l'annulation en fin de période, le changement de plan (proration).

## Anti-patterns à refuser
- Créer une Session/Intent depuis le navigateur.
- Marquer une commande payée sur la page de retour sans webhook.
- Parser le body du webhook avant la vérification de signature.
- Boucler sur l'API sans pagination ni backoff.
