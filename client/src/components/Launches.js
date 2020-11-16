import React, {Fragment} from "react";
import { gql, useQuery } from "@apollo/client";

import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    console.log(error)
    return (
      <p>
        Error :( 
      </p>
    );
  }
  return (
    <Fragment>
      <h2 className="display-5 my-3">Launches</h2>
      <MissionKey />
      {
        (() => {
          return <Fragment>
          {data.launches.map(launch => {
            return <LaunchItem key={launch.flight_number} launch={launch} />
          })}
          </Fragment>
        })()
      }
    </Fragment>
  );
}

export default Launches;
