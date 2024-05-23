# Reclaim Plu-ts Overview

## Purpose

This documentation provides an overview of the core functionalities implemented in the unlockTx.ts and lockTx.ts files, which are integral to managing blockchain transactions for locking and unlocking assets.

## Components

### unlockTx.ts

- Primary Functionality: Handles the unlocking of assets on the blockchain.
- Key Functions:
  - getUnlockTx : Assembles the transaction required to unlock assets.
  - unlockTx : Signs and submits the unlock transaction to the blockchain.
- Utilities:
  - buildRedemeer : Constructs a data map used as a redeemer in transactions.

### lockTx.ts

- Primary Functionality: Manages the locking of assets into the blockchain.
- Key Functions:
  - getLockTx : Prepares the transaction for locking assets.
  - lockTx : Signs and submits the lock transaction to the blockchain.

### reclaimPlutus.ts

- Description: Contains smart contract logic used in transaction validation.
- Components:
  - Datum and Redeemer : Structures that define the data formats for smart contracts.
  - scriptTestnetAddr : Specifies the blockchain address for script execution.

## Integration

### Reclaim Protocol

- Role: Verifies and manages zero-knowledge proofs for blockchain transactions, ensuring secure and verified transaction processes.

### Koios

- Functionality: Used for querying blockchain data and submitting transactions, facilitating interaction with the blockchain network.

## Validation

- Smart Contracts: Utilize Datum and Redeemer for validating transactions against predefined conditions in the blockchain.

## Address Handling

- scriptTestnetAddr is crucial for directing where the scripts execute on the blockchain, ensuring that transactions are processed in the correct environment.

## Transaction Management

- Ensures that transactions meet necessary conditions such as minimum balance (`utxo.resolved.value.lovelaces > 15_000,000` ) before proceeding with locking or unlocking processes.
  This overview serves as a foundation for understanding the functionalities and integrations of the specified components within the project. Further details can be added to expand upon each section as needed.
