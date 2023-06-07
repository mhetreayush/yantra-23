const { Modal, Box, Typography } = require("@mui/material");
import Info from "@/../public/Assets/info.svg";
import Image from "next/image";
import { useState } from "react";
import { style } from "muiModalStyle";
const FeatureModal = ({ name, child }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>
        <Image src={Info} alt="Info" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="muiModalClass">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          {child}
        </Box>
      </Modal>
    </div>
  );
};

export default FeatureModal;
