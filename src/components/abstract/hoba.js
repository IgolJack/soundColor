import React, { useState } from "react";
import {Hoba} from "./HobaPage"
function HobaPage() {

  const [time, setTime] = useState()


Hoba((err, timestamp) => 
   setTime(timestamp )

  );

  return (
    <p>
      It's {time}
    </p>
  );
}


export default HobaPage;