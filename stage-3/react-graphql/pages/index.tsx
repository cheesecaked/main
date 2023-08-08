import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      capital
      code
      continent {
        name
      }
    }
  }
`;

const COUNTRIES = gql`
  query Countries {
    countries {
      capital
      continent {
        name
      }
      name
      currency
      emoji
      code
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(COUNTRIES);

  if (loading) return <p>loadingg</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log({ data });
  return (
    <main>
      <ul>
        {data.countries.map((country: any) => (
          <li><Link href={`${country.name}/${country.code}`}>{country.name}</Link></li>
        ))}
      </ul>
    </main>
  );
}
