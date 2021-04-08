import React, { useState } from "react";
// Material
import Chip from "@material-ui/core/Chip";
import PublicIcon from "@material-ui/icons/Public";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import Container from "@material-ui/core/Container";

export default function Location({ city, country }) {
  const [isOpen, setIsOpen] = useState(false); // Tooltip management state.

  const handleToolTip = () => {
    // Tooltip handler
    setIsOpen(!isOpen);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Container
        maxWidth="sm"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          disableHoverListener
          onClose={handleToolTip}
          open={isOpen}
          title="It may not be the 'closest' city to your real position. Geolocation data may vary due to your ISP's IP Server locations."
        >
          <Chip
            icon={<PublicIcon />}
            label={city + ", " + country}
            clickable
            color="primary"
            onDelete={handleToolTip}
            deleteIcon={<NotListedLocationIcon />}
          />
        </Tooltip>
      </Container>
    </ClickAwayListener>
  );
}
