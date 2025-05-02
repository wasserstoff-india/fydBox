export const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedCall",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "slot",
        type: "bytes32",
      },
    ],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AdminRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "feedbackId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "linkId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPrivate",
        type: "bool",
      },
    ],
    name: "FeedbackSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "linkId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPrivate",
        type: "bool",
      },
    ],
    name: "LinkCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "linkId",
        type: "bytes32",
      },
    ],
    name: "LinkDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "linkId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPrivate",
        type: "bool",
      },
    ],
    name: "LinkPrivacyChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "linkId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    name: "LinkStatusChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "admins",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "allLinks",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_linkName",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_topic",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_topicDescription",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "_isPrivate",
        type: "bool",
      },
    ],
    name: "createLink",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
    ],
    name: "deleteLink",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "feedbackCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "feedbacks",
    outputs: [
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "content",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActivePublicLinks",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllActiveLinks",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_feedbackId",
        type: "uint256",
      },
    ],
    name: "getFeedback",
    outputs: [
      {
        internalType: "bytes",
        name: "content",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "author",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "submitter",
        type: "address",
      },
    ],
    name: "getFeedbackDetailsBySubmitter",
    outputs: [
      {
        internalType: "bytes[]",
        name: "contents",
        type: "bytes[]",
      },
      {
        internalType: "uint256[]",
        name: "timestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "feedbackIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
    ],
    name: "getFullLinkInfo",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "topic",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "topicDescription",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isPrivate",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "feedbackCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
    ],
    name: "getLinkFeedbackIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
    ],
    name: "getLinkFeedbacks",
    outputs: [
      {
        internalType: "bytes[]",
        name: "contents",
        type: "bytes[]",
      },
      {
        internalType: "address[]",
        name: "authors",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "timestamps",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "feedbackIds",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
    ],
    name: "getLinkTopic",
    outputs: [
      {
        internalType: "bytes",
        name: "topic",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "topicDescription",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "getLinksByCreator",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "linkIds",
        type: "bytes32[]",
      },
      {
        internalType: "bytes[]",
        name: "topics",
        type: "bytes[]",
      },
      {
        internalType: "bytes[]",
        name: "topicDescriptions",
        type: "bytes[]",
      },
      {
        internalType: "bool[]",
        name: "isActiveArray",
        type: "bool[]",
      },
      {
        internalType: "bool[]",
        name: "isPrivateArray",
        type: "bool[]",
      },
      {
        internalType: "bool[]",
        name: "isDeletedArray",
        type: "bool[]",
      },
      {
        internalType: "uint256[]",
        name: "feedbackCounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
    ],
    name: "isLinkActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
    ],
    name: "isLinkPrivate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "links",
    outputs: [
      {
        internalType: "bytes32",
        name: "linkId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "topic",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "topicDescription",
        type: "bytes",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isDeleted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isPrivate",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address",
      },
    ],
    name: "removeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "_isPrivate",
        type: "bool",
      },
    ],
    name: "setLinkPrivacy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
      {
        internalType: "bool",
        name: "_isActive",
        type: "bool",
      },
    ],
    name: "setLinkStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_linkId",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "_content",
        type: "bytes",
      },
    ],
    name: "submitFeedback",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
