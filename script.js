
document.addEventListener('DOMContentLoaded', async function () {
    let provider;
    let signer;
    let contract;
  
    const contractAddress = '0x33929af21805993b7cd22d7b18fb96500cd80a87'; // Reemplaza con la dirección de tu contrato
    const contractABI = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'ERC721IncorrectOwner',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ERC721InsufficientApproval',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'approver',
            type: 'address',
          },
        ],
        name: 'ERC721InvalidApprover',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'ERC721InvalidOperator',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'ERC721InvalidOwner',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address',
          },
        ],
        name: 'ERC721InvalidReceiver',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address',
          },
        ],
        name: 'ERC721InvalidSender',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ERC721NonexistentToken',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: '_fromTokenId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: '_toTokenId',
            type: 'uint256',
          },
        ],
        name: 'BatchMetadataUpdate',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
        ],
        name: 'MetadataUpdate',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_destinatario',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_uri',
            type: 'string',
          },
        ],
        name: 'CrearNft',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: 'data',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: '_nombreColeccion',
            type: 'string',
          },
          {
            internalType: 'string',
            name: '_simboloColeccion',
            type: 'string',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'getApproved',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'ownerOf',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'bytes4',
            name: 'interfaceId',
            type: 'bytes4',
          },
        ],
        name: 'supportsInterface',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'tokenURI',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_usuario',
            type: 'address',
          },
        ],
        name: 'traerNftUsuario',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ];
  
    async function connectWallet() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          signer = provider.getSigner();
          const address = await signer.getAddress();
          document.getElementById(
            'accountAddress'
          ).textContent = `Conectado: ${address}`;
          contract = new ethers.Contract(contractAddress, contractABI, signer);
          console.log('Contrato inicializado correctamente');
        } catch (error) {
          console.error('Error al conectar MetaMask:', error);
          document.getElementById('accountAddress').textContent =
            'Error al conectar MetaMask';
        }
      } else {
        alert('MetaMask no está instalado!');
      }
    }
  
    // Conectar a MetaMask
    document
      .getElementById('connectButton')
      .addEventListener('click', async () => {
        await connectWallet();
      });
  
    // Crear NFT
    document
      .getElementById('createNftForm')
      .addEventListener('submit', async event => {
        event.preventDefault();
        const recipient = document
          .getElementById('recipientAddress')
          .value.trim();
        const tokenURI = document.getElementById('tokenURI').value.trim();
        if (recipient && tokenURI && contract) {
          try {
            const tx = await contract.CrearNft(recipient, tokenURI);
            document.getElementById(
              'createNftResult'
            ).textContent = `Transacción enviada: ${tx.hash}`;
            await tx.wait();
            document.getElementById(
              'createNftResult'
            ).textContent = `NFT creado exitosamente con hash de transacción: ${tx.hash}`;
          } catch (error) {
            console.error('Error al crear el NFT:', error);
            document.getElementById(
              'createNftResult'
            ).textContent = `Error: ${error.message}`;
          }
        }
      });
  
    // Transferir NFT
    document
      .getElementById('transferNftForm')
      .addEventListener('submit', async event => {
        event.preventDefault();
        const from = document.getElementById('fromAddress').value.trim();
        const to = document.getElementById('toAddress').value.trim();
        const tokenId = document.getElementById('tokenId').value.trim();
        if (from && to && tokenId && contract) {
          try {
            const tx = await contract[
              'safeTransferFrom(address,address,uint256)'
            ](from, to, tokenId);
            document.getElementById(
              'transferNftResult'
            ).textContent = `Transacción enviada: ${tx.hash}`;
            await tx.wait();
            document.getElementById(
              'transferNftResult'
            ).textContent = `NFT transferido exitosamente con hash de transacción: ${tx.hash}`;
          } catch (error) {
            console.error('Error al transferir el NFT:', error);
            document.getElementById(
              'transferNftResult'
            ).textContent = `Error: ${error.message}`;
          }
        }
      });
  
    // Verificar Balance de NFTs
    document
      .getElementById('checkBalanceForm')
      .addEventListener('submit', async event => {
        event.preventDefault();
        const address = document.getElementById('balanceAddress').value.trim();
        if (address && contract) {
          try {
            const balance = await contract.balanceOf(address);
            document.getElementById(
              'balanceResult'
            ).textContent = `Balance: ${balance.toString()} NFTs`;
          } catch (error) {
            console.error('Error al obtener el balance:', error);
            document.getElementById(
              'balanceResult'
            ).textContent = `Error: ${error.message}`;
          }
        }
      });
  });
  