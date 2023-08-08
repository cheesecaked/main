import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
export default function countryInfo() {
  const router = useRouter();
  const { code } = router.query;
  const { loading, error, data } = useQuery(COUNTRY, {
    variables: {
      code: code,
    },
  });
  if (loading) {
    return <div>loading</div>;
  }
  const name = Object.entries( data.country.continent)

  return (
    <div>
      <h1>Continent: {name[1][1]}</h1>
      <h2>Capital: {data.country.capital}</h2>
      <h2>Code: {data.country.code}</h2>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </div>
  );
}
