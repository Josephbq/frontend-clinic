import React from 'react';
import {
    Typography,
    Checkbox,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";

const CheckboxListItem = ({ id, label,name }) => {
  return (
    <ListItem className="p-0">
      <label
        htmlFor={id}
        className="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <ListItemPrefix className="mr-3">
          <Checkbox
            name={name}
            id={id}
            ripple={false}
            className="hover:before:opacity-0"
            color="red"
            containerProps={{
              className: "p-0",
            }}
          />
        </ListItemPrefix>
        <Typography color="white" className="font-medium">
          {label}
        </Typography>
      </label>
    </ListItem>
  );
};

export default CheckboxListItem;
