import {
  IonPage,
  IonList,
  IonContent,
  IonItemDivider,
  IonCard,
  IonImg,
} from "@ionic/react";
import { Fragment, memo } from "react";

const List: React.FC = memo(() => {
  return (
    <IonPage id="search-page">
      <IonContent>
        <IonList lines="none" className="search-result-list">
           {
            Array.from(Array(100).keys()).map((hotelData) => (
              <Fragment >
                <IonCard routerLink="/cat">
                  <IonImg src="https://t4.ftcdn.net/jpg/03/03/62/45/240_F_303624505_u0bFT1Rnoj8CMUSs8wMCwoKlnWlh5Jiq.jpg"/>
                </IonCard>
                <IonItemDivider className="hotel-item-divider"></IonItemDivider>
              </Fragment>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
});

export default List;
