'use client';

import React from "react";
import { Container } from "@mui/material";
import { StorefrontStats } from "../storefront/StorefrontStats";
export default function StatsSection() {
  return (
    <Container sx={{ py: 8 }}>
      <StorefrontStats stats={[{ label: "Creators", value: "1,200+" }, { label: "Items", value: "4,000+" }, { label: "Aesthetics", value: "15" }]} />
    </Container>
  );
}