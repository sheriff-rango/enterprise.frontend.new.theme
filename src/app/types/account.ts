export interface AccountInfo {
  address: string;
  hash: string;
  name: string;
}

export type User = {
  isAdmin: boolean;
  address: string;
  hash: string;
  first_name: string;
  last_name: string;
  email: string;
  entity_id: string;
  isWhiteListed: string;
  registered: boolean;
} | null;

export type MintInfo = {
  count: number;
  denom: string;
  image_url: string;
  max_nft: number;
  nft_address: string;
  owner: string;
  price: number;
  total_nft: number;
  url: string;
};
