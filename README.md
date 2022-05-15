# CC2
Conception et implémentation d'un système de retry avec une solution de cache (côté backend)

## Conception
Utilisation de **Cache-Aside** comme stratégie du cache en utilisant **redis**.  

**structure de cache**
| key | value | 
----- |-------|
idempotency-key | résultat de traitement de paiement (requete POST)

![alt text](conception.png)