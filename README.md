<div>
    <div>
        <img src="https://raw.githubusercontent.com/reclaimprotocol/.github/main/assets/banners/Pluts-SDK.png"  />
    </div>
</div>

## Purpose

This documentation provides an overview of the core functionalities implemented in the unlockTx.ts and lockTx.ts files, which are integral to managing blockchain transactions for locking and unlocking assets.

## Deployments

| Chain Name | Deployed Address | Explorer Link |
|:-----------|:-----------------|:--------------|
| Cardano Mainnet | addr1wxv5v4jx3xaz4nlgp6j6juw707huauprhfdkst66mlh0fcsn72qrt | https://cardanoscan.io/address/addr1wxv5v4jx3xaz4nlgp6j6juw707huauprhfdkst66mlh0fcsn72qrt
| Cardano Preprod | addr_test1wzv5v4jx3xaz4nlgp6j6juw707huauprhfdkst66mlh0fcsgk7uvw | https://preprod.cardanoscan.io/address/addr_test1wzv5v4jx3xaz4nlgp6j6juw707huauprhfdkst66mlh0fcsgk7uvw

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

## Contributing to Our Project

We're excited that you're interested in contributing to our project! Before you get started, please take a moment to review the following guidelines.

## Code of Conduct

Please read and follow our [Code of Conduct](https://github.com/reclaimprotocol/.github/blob/main/Code-of-Conduct.md) to ensure a positive and inclusive environment for all contributors.

## Security

If you discover any security-related issues, please refer to our [Security Policy](https://github.com/reclaimprotocol/.github/blob/main/SECURITY.md) for information on how to responsibly disclose vulnerabilities.

## Contributor License Agreement

Before contributing to this project, please read and sign our [Contributor License Agreement (CLA)](https://github.com/reclaimprotocol/.github/blob/main/CLA.md).

## Indie Hackers

For Indie Hackers: [Check out our guidelines and potential grant opportunities](https://github.com/reclaimprotocol/.github/blob/main/Indie-Hackers.md)

## License

This project is licensed under a [custom license](https://github.com/reclaimprotocol/.github/blob/main/LICENSE). By contributing to this project, you agree that your contributions will be licensed under its terms.

Thank you for your contributions!

