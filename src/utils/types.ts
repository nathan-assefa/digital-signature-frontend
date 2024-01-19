export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface Profile {
  id: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Document {
  id: number | string;
  file: string;
  name: string;
  owner: User | null;
  message: string;
  signings: SigningDocument[];
  date_uploaded: string | null;
}

export interface SigningDocument {
  id: number | string;
  document: Document;
  recipient: ExternalRecipient;
  is_signed: boolean;
  date_requested: string;
  document_log_file: string | undefined;
}

export interface ExternalRecipient {
  id: number;
  email: string;
}
