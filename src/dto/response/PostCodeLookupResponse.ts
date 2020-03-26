export interface PostCodeLookupResponse {
  code: string;
  data: { streets: string[]; province: string };
}
