// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Used for map markers
var langList = [
    { Name: "Albanian", lat: 42.32, lng: 21.38, },
    { Name: "Armenian", lat: 40.19, lng: 44.48, },
    { Name: "Avestan", lat: 31.54, lng: 53.63, },
    { Name: "Breton", lat: 48.25, lng: -3.79, },
    { Name: "Catalan", lat: 41.45, lng: 1.57, },
    { Name: "Danish", lat: 54.87, lng: 9.36, },
    { Name: "Dutch", lat: 52.00, lng: 5.00, },
    { Name: "Early Irish", lat: 53.00, lng: -8.00, },
    { Name: "English", lat: 53.00, lng: -1.00, },
    { Name: "Faroese", lat: 62.07, lng: -6.88, },
    { Name: "French", lat: 48.00, lng: 2.00, },
    { Name: "Gaulish", lat: 43.97, lng: 3.30, },
    { Name: "German", lat: 48.65, lng: 12.47, },
    { Name: "Gothic", lat: 46.93, lng: 29.98, },
    { Name: "Greek", lat: 38.36, lng: 23.13, },
    { Name: "Icelandic", lat: 63.48, lng: -19.02, },
    { Name: "Irish", lat: 53.22, lng: -7.62, },
    { Name: "Italian", lat: 43.05, lng: 12.65, },
    { Name: "Latin", lat: 41.90, lng: 12.45, },
    { Name: "Latvian", lat: 56.83, lng: 24.31, },
    { Name: "Lithuanian", lat: 55.14, lng: 23.96, },
    { Name: "Low German", lat: 53.12, lng: 12.39, },
    { Name: "Norwegian", lat: 59.92, lng: 10.71, },
    { Name: "Norwegian (Bokmål)", lat: 61.11, lng: 8.89, },
    { Name: "Occitan", lat: 44.14, lng: 6.83, },
    { Name: "Old English", lat: 51.06, lng: -1.31, },
    { Name: "Old Frisian", lat: 53.35, lng: 6.80, },
    { Name: "Old High German", lat: 52.00, lng: 10.00, },
    { Name: "Old Norse", lat: 63.42, lng: 10.38, },
    { Name: "Old Persian", lat: 32.00, lng: 54.00, },
    { Name: "Old Prussian", lat: 52.39, lng: 14.76, },
    { Name: "Old Saxon", lat: 52.37, lng: 9.72, },
    { Name: "Portuguese", lat: 39.91, lng: -8.10, },
    { Name: "Russian", lat: 59.00, lng: 50.00, },
    { Name: "Sanskrit", lat: 20.00, lng: 77.00, },
    { Name: "Spanish", lat: 40.44, lng: -1.12, },
    { Name: "Swedish", lat: 59.80, lng: 17.39, },
    { Name: "Welsh", lat: 52.00, lng: -4.00, },
    { Name: "West Frisian", lat: 53.14, lng: 5.86, },
    { Name: "ancient Greek", lat: 39.82, lng: 21.91, },
    { Name: "Old Church Slavonic", lat: 43.72, lng: 22.84, },
    { Name: "Old Dutch", lat: 52.16, lng: 5.20, },
    { Name: "Old Latin", lat: 41.90, lng: 12.49, },
    { Name: "Oscan", lat: 40.98, lng: 15.67, },
    { Name: "Tocharian", lat: 42.98, lng: 89.18, },
    { Name: "Umbrian", lat: 42.75, lng: 13.02, },
    { Name: "classical Latin", lat: 41.90, lng: 12.49, }
];

// Used for processing of etymology text
var languageList = ["Albanian", "Anglo-Norman", "Armenian", "Aryan", "Avestan", "Breton", "Catalan", "Celtic", "Danish", "Dutch", "Early Irish", "Early Middle English", "Early Runic", "English", "Faroese", "French", "Gaulish", "German regional", "German", "Gothic", "Greek", "Hellenistic Greek", "High German", "Icelandic", "Irish", "Italian", "Latin", "Latvian", "Lithuanian", "Low German", "Middle Dutch", "Middle English", "Middle French", "Middle High German", "Middle Low German", "Norn", "Norwegian", "Norwegian (Bokmål)", "Norwegian (Nynorsk)", "Occitan", "Old Avestan", "Old Breton", "Old Church Slavonic", "Old Danish", "Old Dutch", "Old English", "Old French", "Old Frisian", "Old Germanic", "Old High German", "Old Icelandic", "Old Latin", "Old Norse", "Old Persian", "Old Prussian", "Old Saxon", "Old Swedish", "Old Welsh", "Oscan", "Portuguese", "Russian", "Sanskrit", "Scandinavian", "Spanish", "Swedish", "Tocharian", "Umbrian", "Welsh", "West Frisian", "West German", "West Germanic", "Younger Avestan", "ancient Greek", "classical Latin", "early Scandinavian"];

/*
    class CognateListItem
    {
        string languageName;
        string wordsAndRemarks;
        string parenthesis;
        List<CognateListItem> children;
    }
*/
var cognateList = new Array();

var map;

var quickEtymology = "Cognate with Old Frisian quik (West Frisian kwik, kwyk), Old Dutch quic (Middle Dutch quic, Dutch kwik, kwiek), Old Saxon quik (Middle Low German quik- (apparently only in compounds; compare also quik, noun: see below), German regional (Low German) quick), Old High German quec, quek, also (late) chechh-, cheg (Middle High German quec, also kec, German keck pert, bold, and Queck- (in compounds); compare also German quick lively ( < Low German)), Old Icelandic kvikr, kykr, Old Swedish qvikker, kviker (Swedish qvick), Old Danish qwik, qwig, qweg (Danish kvik, also kvæg), apparently related to Gothic qius alive, and also to Sanskrit jīva, classical Latin vīvus, Lithuanian gývas, Old Church Slavonic živŭ, Early Irish béu, béo (Irish beó), Welsh byw (13th cent.) alive, living, ancient Greek βίος life, although the exact nature of the relationship is uncertain (see below).";

var oneEtymology = "Cognate with Old Frisian ān , ēn , Middle Dutch ein , een , (Dutch een ), Old Saxon ēn(Middle Low German ēn), Old High German ein, ehin, ēn, etc. (Middle High German ein , German ein ), Old Icelandic einn , Swedish en, Danish een , en , Gothic ains, < the same Indo-European base as classical Latin ūnus(Old Latin oinos ), Gaulish oinos(in names), Early Irish oen , óen(Irish aon), Old Welsh, Welsh un , Old Church Slavonic inŭ other, another, (also, usually in jedĭnŭ , in sense ‘one’), Old Prussian ains , Lithuanian vienas, and also ancient Greek οἴνη, Hellenistic Greek οἰνός ace at dice, perhaps ultimately<an extended form of the base of Gothic is he(see he pron.)";

var boneEtymology = "Cognate with Old Frisian bēn bone, (also) leg (West Frisian bien bone, leg), Old Dutch bēn leg, bone (Middle Dutch, Dutch been), Old Saxon bēn bone (Middle Low German bēn, bein leg, bone), Old High German, Middle High German bein bone, leg (German Bein, now chiefly in sense ‘leg’), Old Icelandic bein bone, (lower) leg, Old Swedish, Swedish ben bone, leg, Old Danish, Danish ben bone, leg; further etymology uncertain.";

var iceEtymology = "Cognate with Old Frisian īs (Frisian iis), Middle Dutch īs, ijs (Dutch ijs), Old Saxon īs (Middle Low German īs), Old High German īs (Middle High German īs, German Eis), Old Icelandic íss, Old Swedish, Swedish is, Old Danish, Danish is; further etymology uncertain, perhaps ultimately related to Lithuanian †ynis, Old Church Slavonic inii, inije, Russian inej hoar frost, and perhaps also to Avestan isauu- frost, ice.";

var moneyEtymology = "< Anglo-Norman monai, moné, monee, moneie, monoie, munee, munei and Old French, Middle French monoie, monnoie, moneie, monee, monae, monaye coin, mint (late 12th cent.; compare French monnaie change) < classical Latin monēta , originally the name of a goddess (in classical times regarded as identical with Juno) in whose temple at Rome money was coined, hence, a mint, money; further etymology uncertain, perhaps a foreign loanword, but associated (from ancient times) by popular etymology with monēre to warn, remind (see moneo n.). Compare Old Occitan moneda (c1145), Spanish moneda (1169), Catalan moneda (c1250), Portuguese moeda (1211), Italian moneta (1213 or earlier). Compare mint n.1";


function changeTextBox() {
    var selectedWord = document.getElementById("wordSelect").value;
    switch (selectedWord) {
        case "quick":
            document.getElementById("textBox").innerHTML = quickEtymology;
            break;
        case "bone":
            document.getElementById("textBox").innerHTML = boneEtymology;
            break;
        case "ice":
            document.getElementById("textBox").innerHTML = iceEtymology;
            break;
        case "money":
            document.getElementById("textBox").innerHTML = moneyEtymology;
            break;
        case "one":
            document.getElementById("textBox").innerHTML = oneEtymology;
            break;
        default: 
            document.getElementById("textBox").innerHTML = "ERROR";
    }
}
