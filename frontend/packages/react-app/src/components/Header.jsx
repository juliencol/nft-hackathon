import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/juliencol/nft-hackathon" target="_blank" rel="noopener noreferrer">
      <PageHeader title="Payee " subTitle="💸 Stream your payments with our AI-powered payroll dApp!" style={{ cursor: "pointer" }} />
    </a>
  );
}
