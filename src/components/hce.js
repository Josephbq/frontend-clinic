import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Stepper,
  Step,
} from "@material-tailwind/react";
import { BugAntIcon, TrophyIcon, UserIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import AnteNoPato from "./Form-ui/AnteNoPato";
import AntePato from "./Form-ui/AntePato";
import ExaFisi from "./Form-ui/ExaFisi";
import DiagTra from "./Form-ui/DiagTra";
import Consulta from "./Form-ui/Consulta";
import Nbvr from "./UI/navbar";
import { useUser } from "./UserContext";

function Hce() {
  const { user } = useUser();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <AnteNoPato />;
      case 1:
        return <AntePato />;
      case 2:
        return <ExaFisi />;
      case 3:
        return <Consulta />;
      case 4:
        return <DiagTra />;
      default:
        return null;
    }
  };
  return (
    <>
      <Nbvr
        linkto="/panel"
        user={user.username}
        firstlink="/hce"
        firstlabel="Hce"
        secondlink="/panel" ///cambiar
        secondlabel="Perfil"
        thirdlink="/panel" ///cambiar
        thirdlabel="Horarios"
        sexs="visible"
      />
      <div className="flex-col justify-center items-center h-screen">
        <Card>
          <CardHeader color="gray" className="m-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Historia clinica
            </Typography>
          </CardHeader>
        </Card>
        <Card>
          <CardBody className="flex flex-col gap-4">
            {renderStepContent()}
          </CardBody>
          <CardFooter className="pt-0">
            <div className="w-full py-4 px-8">
              <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
              >
                <Step onClick={() => setActiveStep(0)}>
                  <UserIcon className="h-5 w-5" />
                </Step>
                <Step onClick={() => setActiveStep(1)}>
                  <BugAntIcon className="h-5 w-5" />
                </Step>
                <Step onClick={() => setActiveStep(2)}>
                  <TrophyIcon className="h-5 w-5" />
                </Step>
                <Step onClick={() => setActiveStep(3)}>
                  <ClipboardDocumentCheckIcon className="h-5 w-5" />
                </Step>
                <Step onClick={() => setActiveStep(4)}>
                  <ClipboardDocumentCheckIcon className="h-5 w-5" />
                </Step>
              </Stepper>
              <div className="mt-8 flex justify-between">
                <Button onClick={handlePrev} disabled={isFirstStep}>
                  Previo
                </Button>
                <Button onClick={handleNext} disabled={isLastStep}>
                  Siguiente
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default Hce;
