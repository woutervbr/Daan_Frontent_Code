import React, { useState, useRef } from "react";

const HAlgemene = () => {
  return (
    <section className="Privicypolicy">
      <div className="New-container">
        <div className="main-privicy-policy">
          <h2>Wie zijn wij?</h2>
          <span className="Naam-box">
            Naam:<p> Ongeschreven Leven</p>
          </span>
          <span className="Naam-box">
            E-mail:<p> info@ongeschrevenleven.nl</p>
          </span>
          <span className="Naam-box">
            {" "}
            KVK:<p> 97211958</p>
          </span>
          <span className="Naam-box">
            {" "}
            Website:
            <p>
              {" "}
              <a href="http://www.ongeschrevenleven.nl/">
                http://www.ongeschrevenleven.nl/
              </a>
            </p>
          </span>
          <h2>Voor wie gelden deze voorwaarden?</h2>
          <p>
            Deze voorwaarden gelden voor alle producten en diensten die je via
            onze website bestelt of gebruikt.
          </p>
          <p>
            Door te bestellen of gebruik te maken van onze diensten, ga je
            akkoord met deze voorwaarden.
          </p>
          <h2>Productinformatie</h2>
          <h3>Het Levensboek:</h3>
          <ul>
            <li>Hardcover boek in A5-formaat (staand)</li>
            <li>Full-color druk op hoogwaardig papier</li>
            <li>Bevat verhalen, foto’s en QR-codes naar video’s</li>
            <li>Tot 160 pagina’s inbegrepen bij de standaardprijs</li>
          </ul>
          <h2>Optioneel:</h2>
          <ul>
            <li>Professioneel ingesproken luisterboek</li>
            <li>Familiegesprekken kaartspel</li>
          </ul>
          <h2> Pagina’s en prijzen</h2>
          <p>
            De standaardprijs van het Levensboek is gebaseerd op een boek tot
            160 pagina’s.
          </p>
          <h3>Meer pagina’s? Dan gelden de volgende kosten:</h3>
          <ul>
            <li>160–300 pagina’s: €30 extra</li>
            <li>
              Meer dan 300 pagina’s: automatisch opgesplitst in 2 delen:
              <ul>
                <li>Eerste exemplaar: €89 x 2 = €178</li>
                <li>Extra exemplaren bij 300+ pagina’s: €148 per stuk</li>
              </ul>
            </li>
          </ul>
          <h2>Extra boeken (standaard tot 160 pagina’s):</h2>
          <ul>
            <li>Eerste boek: inbegrepen</li>
            <li>Extra exemplaren: €60 per stuk</li>
          </ul>
          <h2>Extra boeken (161–300 pagina’s):</h2>
          <ul>
            <li>€60 + €30 = €90 per stuk</li>
          </ul>
          <h2>Bestellen & annuleren</h2>
          <ul>
            <li>Na je bestelling ontvang je een bevestigingsmail.</li>
            <li>
            De bestelling van het levensboek kan binnen 30 dagen worden geannuleerd
            </li>
            <li>
              Annuleren kan alleen zolang het boek nog niet in productie is
              (drukproces gestart = bindend).
            </li>
            <li>
              Neem bij twijfel z.s.m. contact met ons op via
              info@ongeschrevenleven.nl
            </li>
            
          </ul>
          <h2>Retourneren en bedenktijd</h2>
          <h3>
            Gepersonaliseerde producten (zoals het Levensboek en luisterboek):
          </h3>
          <ul>
            <li>
              Deze worden op maat gemaakt en zijn uitgesloten van het
              herroepingsrecht.
            </li>
            <li>
              Zodra het boek of luisterboek in productie is genomen, vervalt het
              recht op annulering of retour.
            </li>
            <li>
              Uiteraard lossen wij productiefouten (zoals druk- of bindfouten)
              netjes op.
            </li>
            
          </ul>
          <h3>Familiegesprekken kaartspel:</h3>
          <ul>
            <li>
              Het kaartspel mag binnen <span>14 dagen </span>na ontvangst worden
              geretourneerd, mits:
              <ul>
                <li>Het ongebruikt is</li>
                <li>
                  De kaarten en doosje <b>onbeschadigd</b> zijn (geen vouwen,
                  deuken of scheuren)
                </li>
                <li>
                  Alles compleet en netjes verpakt is (zodat het verkoopbaar
                  blijft)
                </li>
              </ul>
            </li>

            <li>
              Jij bent verantwoordelijk voor een veilige retourzending.
              Verzendkosten voor retour zijn voor eigen rekening.
            </li>
            <li>
              Als het spel bij ontvangst <b> niet in originele staat</b> is,
              behouden wij het recht om geen restitutie te geven of slechts een
              deel terug te betalen.
            </li>
          </ul>
          <h3>Audioboek</h3>
          <p>
            Het audioboek valt onder digitale inhoud en wordt speciaal voor jou
            gegenereerd op basis van jouw persoonlijke verhaal, met behulp van
            AI-technologie.
          </p>
          <ul>
            <li>
              Omdat het audioboek gepersonaliseerd is, geldt er geen recht op
              retour zodra het is geleverd.
            </li>
            <li>
              Door tijdens het bestellen akkoord te gaan met directe levering,
              geef je uitdrukkelijk toestemming voor het starten van de levering
              en erken je dat je daarmee{" "}
              <b> afstand doet van je herroepingsrecht.</b>
            </li>
            <li>
              Heb je het audioboek nog <b>niet ontvangen</b> (bijvoorbeeld omdat
              het nog niet is verzonden)? Dan heb je{" "}
              <b> tot 14 dagen na bestelling </b> de mogelijkheid om je aankoop
              te annuleren en je geld terug te krijgen.
            </li>
          </ul>
          <p>
            Zodra het audioboek is verstuurd (bijvoorbeeld per e-mail of
            downloadlink), is annuleren of retourneren{" "}
            <b> niet meer mogelijk.</b>
          </p>
          <h2>Levering</h2>
          <ul>
            <li>
              Binnen 10 werkdagen na goedkeuring van het boek ontvang je jouw
              drukwerk.
            </li>
            <li>
              Verzendkosten worden vooraf duidelijk vermeld bij het afrekenen.
            </li>
            <li>
              Verzending binnen Nederland is gratis bij acties of bij bepaalde
              bedragen (zoals vermeld in de webshop).
            </li>
          </ul>
          <h2> Toegang & verlenging</h2>
          <ul>
            <li>
              Je krijgt standaard 1 jaar toegang tot het platform en de
              vragenlijst.
            </li>
            <li>Niet klaar? Voor €30 verleng je je toegang met 1 jaar.</li>
            <li>
              Verlenging is nooit verplicht. Je behoudt toegang tot je reeds
              ingevoerde gegevens.
            </li>
          </ul>
          <h2>Intellectueel eigendom & gebruik</h2>
          <ul>
            <li>
              Alles wat jij aanlevert (tekst, foto’s, video’s, audio) blijft
              jouw eigendom.
            </li>
            <li>
              Je geeft ons toestemming om het uitsluitend te gebruiken voor jouw
              boek of luisterboek.
            </li>
            <li>
              We delen of gebruiken je materiaal nooit voor andere doeleinden
              zonder jouw expliciete toestemming.
            </li>
          </ul>
          <h2> Marketing & communicatie</h2>
          <ul>
            <li>
              Alleen als je daar actief toestemming voor hebt gegeven, sturen we
              nieuwsbrieven of updates.
            </li>
            <li>
              Afmelden kan altijd via de afmeldlink of via
              info@ongeschrevenleven.nl.
            </li>
          </ul>
          <h2>Aansprakelijkheid</h2>
          <p>
            Wij doen er alles aan om een zorgvuldig en kwalitatief eindproduct
            te leveren.
          </p>
          <p>
            Wij zijn <span> niet aansprakelijk </span>voor:
          </p>
          <ul>
            <li>Inhoudelijke onjuistheden in aangeleverde content</li>
            <li>Vertragingen buiten onze schuld (bijv. post)</li>
            <li>
              Verwachtingen die niet stroken met de realiteit van persoonlijke
              verhalen
            </li>
          </ul>
          <p>
            Bij fouten aan onze kant (drukfout, beschadiging) zorgen we voor
            herstel of herdruk.
          </p>
          <h2>Privacy & gegevens</h2>
          <p>
            We gaan zorgvuldig om met jouw gegevens. Zie hiervoor onze aparte
            <a href="/Privacypolicy"> Privacyverklaring.</a> Je data is veilig,
            blijft van jou, en wordt nooit verkocht.
          </p>
          <p>
            Onze website gebruikt cookies. Je kunt je voorkeuren altijd
            aanpassen.
          </p>
          <h2>Bewaartermijnen</h2>
          <ul>
            <li>
              Boekgegevens, verhalen, foto’s en audio: zolang jij een actief
              account hebt.
            </li>
            <li>
              Facturatiegegevens: 7 jaar, conform de Nederlandse belastingwet.
            </li>
          </ul>
          <h2>Rechten van gebruikers</h2>
          <p>Je hebt het recht om:</p>
          <ul>
            <li>Je gegevens in te zien</li>
            <li> Ze te corrigeren</li>

            <li>Ze te laten verwijderen</li>

            <li>Bezwaar te maken tegen verwerking</li>

            <li>Een klacht in te dienen bij de Autoriteit Persoonsgegevens</li>
          </ul>
          <p>Stuur je verzoek naar info@ongeschrevenleven.nl.</p>
          <h2> Wijzigingen in de voorwaarden</h2>
          <p>
            Ongeschreven Leven mag deze voorwaarden aanpassen. Grote wijzigingen
            communiceren wij per e-mail of op onze website. De meest recente
            versie is altijd leidend.
          </p>
          <h2>Geschillen & toepasselijk recht</h2>
          <p>
            Op deze voorwaarden is uitsluitend Nederlands recht van toepassing.
            Eventuele geschillen worden voorgelegd aan de bevoegde rechter in
            het arrondissement waarin Ongeschreven Leven is gevestigd.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HAlgemene;
