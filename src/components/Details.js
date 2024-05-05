import React from "react";
import { useParams } from "react-router-dom";
const Details = () => {
  const params = useParams();
  let data = JSON.parse(localStorage.getItem("list"));

  const renderLink = (url) => {
    return (
      <span
        onClick={() => window.open(url, "_blank")}
        style={{
          cursor: "pointer",
          color: "blue",
          textDecoration: "underline",
        }}
      >
        {url}
      </span>
    );
  };
  return (
    <div>
      <table>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>State-Province</th>
          <th>Domain</th>
          <th>Web Page</th>
        </tr>

        <tr>
          <td>{data[params.id].alpha_two_code}</td>
          <td>{data[params.id].name}</td>
          <td>{data[params.id]["state-province"]}</td>
          <td>{data[params.id].domains[0]}</td>
          <td>{renderLink(data[params.id].web_pages[0])}</td>
        </tr>
      </table>
    </div>
  );
};

export default Details;
