import {
  IonPage,
  IonContent,
  IonImg,
} from "@ionic/react";
import { memo } from "react";

const Cat: React.FC = memo(() => {
  

  return (
    <IonPage>
      <IonContent >
        <IonImg src="https://t4.ftcdn.net/jpg/03/03/62/45/240_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg"/>
      </IonContent>
    </IonPage>
  );
});

export default Cat;
