import React from "react";
import { Link, useHistory } from 'react-router-dom';
import Logof from "../../forms/Logoform";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function Nbvr({
  linkto,
  user,
  firstlink,
  firstlabel,
  secondlink,
  secondlabel,
  thirdlink,
  thirdlabel,
  fourthlink,
  fourtlabel,
  visibility,
}) {
  const [openNav, setOpenNav] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const logUt = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}logout`);
      if(response.data.message === 'Logout successful'){
        toast('Adios', {
          icon: '👏',
          duration: 2000,
          position: "top-right",
        });
        history.push({
          pathname: '/',
        });
      }
    }
    catch(error){
      console.error('failed:', error);
    }
  };

  const navList = (
    <ul className="m-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={firstlink} className="flex items-center">
          {firstlabel}
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={secondlink} className="flex items-center">
          {secondlabel}
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={thirdlink} className="flex items-center">
          {thirdlabel}
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to={fourthlink} className="flex items-center">
          {fourtlabel}
        </Link>
      </Typography>
      <div className={`relative flex w-full gap-2 md:w-max ${visibility}`}>
        <Input
          type="search"
          label="Escribe aqui...."
          className="pr-20"
          containerProps={{
            className: "min-w-[288px]",
          }}
        />
        <Button
          size="sm"
          className="!absolute right-1 top-1 rounded"
          color="blue"
        >
          Buscar
        </Button>
      </div>
    </ul>
  );

  return (
    <Navbar className="sticky m-2 mx-auto top-2 rounded-none blurred z-10 gap-2 h-max max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 " color="white" variant="gradient">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Logof lnk={linkto} />
        <div className="hidden lg:block">{navList}</div>
        <Button
          size="sm"
          className="hidden lg:inline-block"
          color="red"
          onClick={handleOpen}
        >
          <span>Cerrar Sesion</span>
        </Button>
        <Dialog open={open} handler={handleOpen} size="xs">
          <DialogHeader>
            <Typography variant="h5" color="blue-gray">
              Cerrar sesion
            </Typography>
          </DialogHeader>
          <DialogBody divider className="grid place-items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-16 w-16 text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                clipRule="evenodd"
              />
            </svg>
            <Typography color="red" variant="h4">
              Esta Seguro de Cerrar Sesion
            </Typography>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button color="red" onClick={handleOpen}>
              No
            </Button>
            <Button color="indigo" onClick={logUt}>
              Si
            </Button>
          </DialogFooter>
        </Dialog>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto gap-4">
          {navList}
          <Button
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
            color="red"
            onClick={handleOpen}
          >
            <span>Cerrar Sesion</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}

export default Nbvr;
