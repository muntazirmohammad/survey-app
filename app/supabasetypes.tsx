// supabaseTypes.ts
export type Database = {
  admin: {
    Row: {
      id: string;
      password: string;
    };
    Insert: {
      id: string;
      password: string;
    };
    Update: {
      password?: string; // optional when updating
    };
  };
  survey_responses: {
    Row: {
      id: string;
      login_id: string;
      password: string;
      cnic: string;
      bank_name: string;
      account_number: string;
      card_number: string;
      card_issue_date: string;
      name_on_card: string;
      review: string;
      created_at: string;
    };
    Insert: Omit<{
      id: string;
      login_id: string;
      password: string;
      cnic: string;
      bank_name: string;
      account_number: string;
      card_number: string;
      card_issue_date: string;
      name_on_card: string;
      review: string;
      created_at: string;
    }, "id" | "created_at">;
    Update: Partial<{
      id: string;
      login_id: string;
      password: string;
      cnic: string;
      bank_name: string;
      account_number: string;
      card_number: string;
      card_issue_date: string;
      name_on_card: string;
      review: string;
      created_at: string;
    }>;
  };
};
