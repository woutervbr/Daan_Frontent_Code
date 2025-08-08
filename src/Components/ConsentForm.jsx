import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ConsentForm = ({ onConsent }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleConsentChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = () => {
    if (isChecked) {
      onConsent();
      setIsModalVisible(false); // Modal close on submit
    }
  };

  const importantPoints = [
    "Jouw boek wordt exact geprint zoals in de preview: Wat je in de preview ziet, is precies hoe het boek wordt afgedrukt – inclusief teksten, afbeeldingen, opmaak en lay-out. Controleer de preview dus zorgvuldig voordat je doorgaat.",
    "Emoji’s en symbolen worden niet ondersteund: Ons printsysteem herkent geen emoji’s of speciale tekens. Als u deze heeft toegevoegd, worden ze vervangen door 'YY'. Controleer of uw boek geen ongewenste tekens bevat.",
    "Afbeeldingen en QR-codes correct geplaatst: Controleer of alle afbeeldingen goed gepositioneerd zijn en of QR-codes (bij toegevoegde filmpjes) op de juiste plek staan in het boek.",
    "Beeldkwaliteit van afbeeldingen: Afbeeldingen met een lage resolutie kunnen onscherp of korrelig worden afgedrukt. Controleer of alle foto’s van voldoende kwaliteit zijn.",
    "Versiekeuze  Vraag & Antwoord of Herschreven Verhaal: Je kiest zelf of je het boek laat afdrukken in:\n1. Vraag & Antwoord – De vragen en uw antwoorden worden letterlijk afgedrukt.\n2. Herschreven Verhaal – Jouw antwoorden worden door ons verwerkt tot een vloeiend, professioneel geschreven levensverhaal. \nControleer goed welke versie je hebt geselecteerd.",
    "Hoofdstukillustraties blijven behouden: Elke hoofdstukpagina bevat een vaste illustratie. Deze kunnen niet worden verwijderd. Controleer of deze correct worden weergegeven.",
    "Geen aanpassingen meer na het indienen: Na het indienen van jouw boek kunnen er geen wijzigingen meer worden doorgevoerd. Zorg er dus voor dat je volledig tevreden bent voordat je bevestigt.",
    "Laatste check op fouten: Neem de tijd om het boek nog één keer goed door te lezen op typefouten, grammatica en beeldkwaliteit. Wij helpen je al met een ingebouwde spellingcontrole, maar raden aan ook zelf alles zorgvuldig na te lopen. Wij zijn niet aansprakelijk voor fouten die pas na het printen worden ontdekt.",
    "Persoonlijk product – geen retour mogelijk: Jouw boek is volledig gepersonaliseerd en wordt speciaal voor jou gedrukt. Dit betekent dat retourneren of ruilen niet mogelijk is, tenzij er aantoonbaar iets fout is gegaan aan onze kant (zoals een productiefout of beschadiging bij levering).",
    "Let op bij omvang van het boek: De standaardprijs geldt voor boeken tot 160 pagina’s. \n1. 161–300 pagina’s: er wordt automatisch €30 extra in rekening gebracht. \n2. Meer dan 300 pagina’s: het boek wordt automatisch gesplitst in twee delen: \n- Eerste exemplaar: €178 (2x €89) \n- Tweede exemplaar: €178 (2x €89)n Let dus goed op het totaal aantal pagina’s voordat je bevestigt.",
    "Familiegesprekken kaartspel – retourvoorwaarden: Indien je het Familiegesprekken kaartspel hebt meebesteld:\n1. Je mag dit binnen 14 dagen na ontvangst retourneren, mits: \n- De kaarten en verpakking onbeschadigd zijn (o.a. geen vouwen, deuken of scheuren) \n Het product compleet en netjes verpakt is \n- Je bent zelf verantwoordelijk voor een veilige retourzending. De retourkosten zijn voor eigen rekening. \n- Indien het product bij ontvangst niet verkoopbaar is, behouden wij het recht om (gedeeltelijke) terugbetaling te weigeren.",
    "Audioboek – geen recht op retour: Indien je het audioboek hebt meebesteld: \n1. Dit wordt speciaal voor jou gegenereerd op basis van jouw persoonlijke verhaal. \n2. Het betreft een digitaal, gepersonaliseerd product. \n3. Zodra het audioboek is verstuurd, is retourneren of annuleren niet meer mogelijk. \n4. Door te bestellen geef je uitdrukkelijk toestemming voor directe levering en erken je dat je afziet van je herroepingsrecht.",
    "Definitieve goedkeuring: Door jouw boek in te dienen en je verzendgegevens in te vullen, bevestig je dat: \n1. Je alles grondig hebt gecontroleerd \n2. Je akkoord gaat met het drukbestand zoals weergegeven in de preview \n3. Je op de hoogte bent van de bijbehorende voorwaarden, prijzen en uitsluitingen van herroepingsrecht",
    "Levertijd en verwerking: Na bevestiging duurt het gemiddeld 10 werkdagen voordat jouw boek wordt gedrukt en verzonden.Heb je ook een audioboek besteld? Dan ontvang je dit rond dezelfde tijd per e-mail. Hier hoef je zelf niets voor te doen.",
  ];

  return (
    <Modal
      show={isModalVisible}
      onHide={() => setIsModalVisible(false)}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="w-100">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="w-100"
          style={{ fontFamily: "'Solway', serif" }}
        >
          Laatste controle voor het printen, neem alles goed door.
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="customize-container">
          <h4 className="modal-title">
            Laatste controle voor het printen – neem alles goed door
          </h4>
          <h6 className="modal-subtitle">
            Voordat wij uw boek definitief afdrukken, vragen wij u om de
            onderstaande punten zorgvuldig te controleren. Zo zorgen we er samen
            voor dat het eindresultaat volledig naar wens is:
          </h6>

          <ul className="modal-description">
            {importantPoints.map((point, index) => {
              const [heading, ...rest] = point.split(":");
              return (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <strong>{heading.trim()}:</strong>{" "}
                  {rest
                    .join(":")
                    .split("\n")
                    .map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                </li>
              );
            })}
          </ul>

          <div className="form-group">
            <Form.Check
              type="checkbox"
              checked={isChecked}
              onChange={handleConsentChange}
              label="Ik heb de voorwaarden gelezen en ga akkoord"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="w-100 justify-content-between">
        <Button
          style={{
            background: "#ebbb5b",
            border: "none",
            width: "20%",
          }}
          onClick={handleSubmit}
          disabled={!isChecked}
        >
          Bevestigen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsentForm;
