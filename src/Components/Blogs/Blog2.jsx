import React from "react";
import { Link } from "react-router-dom";
import Newheader from "../WebSite_Componets/Newheader";
import blog2 from "../../assets/Gif/blog2.png";
import Newfooter from "../WebSite_Componets/Newfooter";

function Blog2() {
  return (
    <div>
      <Newheader />
      <div className="New-container">
        <div className="blog-section">
          <div className="img-section">
            <img src={blog2} alt="Blog Visual" />
          </div>

          <h3>Familiegesprekken: het kaartspel dat generaties verbindt</h3>
          <p>
            Of je nu op zoek bent naar een betekenisvol cadeau voor je ouders of opa en oma, of gewoon een avondje echte gesprekken wilt aan tafel — het Familiegesprekken kaartspel van Ongeschreven Leven is ontworpen om families dichter bij elkaar te brengen.
          </p>
          <p>
            Van “Wat was je favoriete gezinsuitje?” tot “Wat is een levensles die je pas op latere leeftijd hebt geleerd?” — elke vraag is een uitnodiging tot verdieping, verbinding en verwondering.
          </p>

          <h4>Wat is het Familiegesprekken kaartspel?</h4>
          <p>
            Een luxe kaartenset bestaande uit 144 vragen verdeeld in drie categorieën:
          </p>
          <ul>
            <li><strong>Herinneringen ophalen</strong> – denk aan jeugd, eerste vakanties, kattenkwaad en eerste liefdes</li>
            <li><strong>Hier & Nu</strong> – over gewoontes, kleine geluksmomentjes, vriendschap en reflectie</li>
            <li><strong>Toekomst & dromen</strong> – over toekomstdromen, wat je nog wil leren of doorgeven</li>
          </ul>

          <p> Speel het met een dobbelsteen, kies een kaart, stel de vraag aan wie jij wil — en laat het gesprek ontstaan. Geen goed of fout. Alleen echte verhalen.</p>

          <h4>Waarom het werkt voor álle generaties</h4>
          <ul>
            <li>Kinderen leren hun grootouders écht kennen</li>
            <li>Ouders staan stil bij hun eigen levensverhaal</li>
            <li>Grootouders voelen zich gehoord en gezien</li>
          </ul>
          <p>
            En het mooiste? De gesprekken die ontstaan, zijn niet alleen waardevol in het moment, ze kunnen ook eenvoudig worden vastgelegd in het Levensboek van Ongeschreven Leven via spraak-naar-tekst of geschreven herinneringen. Zo blijven ze voor altijd bewaard.
          </p>

          <h4>Herinneringen ophalen is gezond (echt waar)</h4>
          <p>
            Volgens onderzoek van het Alzheimercentrum Amsterdam helpt het ophalen van herinneringen om cognitieve functies bij ouderen te stimuleren en gevoelens van eenzaamheid te verminderen.
          </p>
          <ul>
            <li> <b> 1 op de 3 vrouwen </b> en <b>1 op de 5 mannen </b> krijgt in Nederland dementie (bron: Alzheimer Nederland, 2024).</li>
            <li> Gesprekken over het verleden activeren het brein en bevorderen het welzijn.</li>
          </ul>

          <p>
            Regelmatig stilstaan bij het eigen levensverhaal blijkt één van de krachtigste en meest toegankelijke manieren om herinneringen levend te houden én achteruitgang te vertragen.
          </p>

          <h4>Wat maakt dit spel anders dan een standaard spelletje?</h4>
          <ul>
            <li> Gesprekken met diepgang, geen oppervlakkige babbel</li>
            <li> Zelfreflectie én familieverhalen in één</li>
            <li> Perfect als cadeau – voor feestdagen, verjaardagen of zomaar</li>
            <li> Direct te koppelen aan het Levensboek – verhalen kunnen worden opgenomen en vereeuwigd</li>
          </ul>

          <h4>Voor wie is het?</h4>
          <p>
            Voor iedereen die een ouder, grootouder of oudere dierbare heeft. Voor gezinnen die nog een keer samen aan tafel willen zitten zonder telefoon. Voor kinderen die hun ouders willen horen vertellen. Voor wie wil lachen, huilen, herinneren en dromen.
          </p>
          <p>
            En vooral: voor ouderen die soms vergeten worden, maar nog zóveel te vertellen hebben.
          </p>

          <h4>Prijs & kwaliteit</h4>
          <ul>
            <li>€30 (tijdelijk) – in plaats van €45</li>
            <li>150 stevige kaarten, luxe doos, fluwelen zakje met dobbelsteen</li>
            <li>Gratis verzending, 14 dagen bedenktijd</li>
            <li>Direct leverbaar</li>
          </ul>

          <h4>Tot slot</h4>
          <p>
            Het Familiegesprekken kaartspel is méér dan een spel. Het is een brug tussen generaties. Een kans om stil te staan bij wie je bent, waar je vandaan komt en wat je wilt doorgeven.
          </p>
          <p>
            En in een tijd waarin steeds meer mensen opgroeien zonder de verhalen van hun ouders of grootouders te kennen, is dat misschien wel het waardevolste wat je kunt geven.
          </p>
          <blockquote>
             “Ze vertelde iets wat ik in 35 jaar nog nooit van haar had gehoord.” <br />
            – klantreview via ongeschrevenleven.nl
          </blockquote>

          <p>
             <Link to="/login">Bestel het kaartspel of bekijk hoe je de verhalen kunt vastleggen in het Levensboek hier</Link>
          </p>


          

          
        </div>
        
      </div>
              <Newfooter/>
    </div>
  );
}

export default Blog2;
