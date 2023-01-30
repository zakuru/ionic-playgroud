import {
  IonPage,
  IonList,
  IonContent,
  IonItemDivider,
  IonCard,
  IonImg,
} from "@ionic/react";
import { Fragment, memo } from "react";
import './List.css';

const List: React.FC = memo(() => {
  return (
    <IonPage id="search-page">
      <div id="carousel" className="snap vertical">
        {
          Array.from(Array(1000).keys()).map((e, i) => {
            return <div id={`carousel-${i % 4}`}>
              <img alt="abcd" src="https://t4.ftcdn.net/jpg/03/03/62/45/240_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg"/>
              </div>;
          })
        }
      </div>
    </IonPage>
  );
});

export default List;
