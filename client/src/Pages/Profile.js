import React from "react";

import { props } from "react-router-dom";

function Profile(props) {
  //let { username } = useParams();
  return (
    <div>
      <h1> Welcome {props.username} ! </h1>
    </div>
  );
}
export default Profile;
