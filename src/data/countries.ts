const countries = [
  {
    name: "Andorra",
    emoji: "๐ฆ๐ฉ",
  },
  {
    name: "United Arab Emirates",
    emoji: "๐ฆ๐ช",
  },
  {
    name: "Afghanistan",
    emoji: "๐ฆ๐ซ",
  },
  {
    name: "Antigua and Barbuda",
    emoji: "๐ฆ๐ฌ",
  },
  {
    name: "Anguilla",
    emoji: "๐ฆ๐ฎ",
  },
  {
    name: "Albania",
    emoji: "๐ฆ๐ฑ",
  },
  {
    name: "Armenia",
    emoji: "๐ฆ๐ฒ",
  },
  {
    name: "Angola",
    emoji: "๐ฆ๐ด",
  },
  {
    name: "Antarctica",
    emoji: "๐ฆ๐ถ",
  },
  {
    name: "Argentina",
    emoji: "๐ฆ๐ท",
  },
  {
    name: "American Samoa",
    emoji: "๐ฆ๐ธ",
  },
  {
    name: "Austria",
    emoji: "๐ฆ๐น",
  },
  {
    name: "Australia",
    emoji: "๐ฆ๐บ",
  },
  {
    name: "Aruba",
    emoji: "๐ฆ๐ผ",
  },
  {
    name: "รland",
    emoji: "๐ฆ๐ฝ",
  },
  {
    name: "Azerbaijan",
    emoji: "๐ฆ๐ฟ",
  },
  {
    name: "Bosnia and Herzegovina",
    emoji: "๐ง๐ฆ",
  },
  {
    name: "Barbados",
    emoji: "๐ง๐ง",
  },
  {
    name: "Bangladesh",
    emoji: "๐ง๐ฉ",
  },
  {
    name: "Belgium",
    emoji: "๐ง๐ช",
  },
  {
    name: "Burkina Faso",
    emoji: "๐ง๐ซ",
  },
  {
    name: "Bulgaria",
    emoji: "๐ง๐ฌ",
  },
  {
    name: "Bahrain",
    emoji: "๐ง๐ญ",
  },
  {
    name: "Burundi",
    emoji: "๐ง๐ฎ",
  },
  {
    name: "Benin",
    emoji: "๐ง๐ฏ",
  },
  {
    name: "Saint Barthรฉlemy",
    emoji: "๐ง๐ฑ",
  },
  {
    name: "Bermuda",
    emoji: "๐ง๐ฒ",
  },
  {
    name: "Brunei",
    emoji: "๐ง๐ณ",
  },
  {
    name: "Bolivia",
    emoji: "๐ง๐ด",
  },
  {
    name: "Bonaire",
    emoji: "๐ง๐ถ",
  },
  {
    name: "Brazil",
    emoji: "๐ง๐ท",
  },
  {
    name: "Bahamas",
    emoji: "๐ง๐ธ",
  },
  {
    name: "Bhutan",
    emoji: "๐ง๐น",
  },
  {
    name: "Bouvet Island",
    emoji: "๐ง๐ป",
  },
  {
    name: "Botswana",
    emoji: "๐ง๐ผ",
  },
  {
    name: "Belarus",
    emoji: "๐ง๐พ",
  },
  {
    name: "Belize",
    emoji: "๐ง๐ฟ",
  },
  {
    name: "Canada",
    emoji: "๐จ๐ฆ",
  },
  {
    name: "Cocos [Keeling] Islands",
    emoji: "๐จ๐จ",
  },
  {
    name: "Democratic Republic of the Congo",
    emoji: "๐จ๐ฉ",
  },
  {
    name: "Central African Republic",
    emoji: "๐จ๐ซ",
  },
  {
    name: "Republic of the Congo",
    emoji: "๐จ๐ฌ",
  },
  {
    name: "Switzerland",
    emoji: "๐จ๐ญ",
  },
  {
    name: "Ivory Coast",
    emoji: "๐จ๐ฎ",
  },
  {
    name: "Cook Islands",
    emoji: "๐จ๐ฐ",
  },
  {
    name: "Chile",
    emoji: "๐จ๐ฑ",
  },
  {
    name: "Cameroon",
    emoji: "๐จ๐ฒ",
  },
  {
    name: "China",
    emoji: "๐จ๐ณ",
  },
  {
    name: "Colombia",
    emoji: "๐จ๐ด",
  },
  {
    name: "Costa Rica",
    emoji: "๐จ๐ท",
  },
  {
    name: "Cuba",
    emoji: "๐จ๐บ",
  },
  {
    name: "Cape Verde",
    emoji: "๐จ๐ป",
  },
  {
    name: "Curacao",
    emoji: "๐จ๐ผ",
  },
  {
    name: "Christmas Island",
    emoji: "๐จ๐ฝ",
  },
  {
    name: "Cyprus",
    emoji: "๐จ๐พ",
  },
  {
    name: "Czech Republic",
    emoji: "๐จ๐ฟ",
  },
  {
    name: "Germany",
    emoji: "๐ฉ๐ช",
  },
  {
    name: "Djibouti",
    emoji: "๐ฉ๐ฏ",
  },
  {
    name: "Denmark",
    emoji: "๐ฉ๐ฐ",
  },
  {
    name: "Dominica",
    emoji: "๐ฉ๐ฒ",
  },
  {
    name: "Dominican Republic",
    emoji: "๐ฉ๐ด",
  },
  {
    name: "Algeria",
    emoji: "๐ฉ๐ฟ",
  },
  {
    name: "Ecuador",
    emoji: "๐ช๐จ",
  },
  {
    name: "Estonia",
    emoji: "๐ช๐ช",
  },
  {
    name: "Egypt",
    emoji: "๐ช๐ฌ",
  },
  {
    name: "Western Sahara",
    emoji: "๐ช๐ญ",
  },
  {
    name: "Eritrea",
    emoji: "๐ช๐ท",
  },
  {
    name: "Spain",
    emoji: "๐ช๐ธ",
  },
  {
    name: "Ethiopia",
    emoji: "๐ช๐น",
  },
  {
    name: "Finland",
    emoji: "๐ซ๐ฎ",
  },
  {
    name: "Fiji",
    emoji: "๐ซ๐ฏ",
  },
  {
    name: "Falkland Islands",
    emoji: "๐ซ๐ฐ",
  },
  {
    name: "Micronesia",
    emoji: "๐ซ๐ฒ",
  },
  {
    name: "Faroe Islands",
    emoji: "๐ซ๐ด",
  },
  {
    name: "France",
    emoji: "๐ซ๐ท",
  },
  {
    name: "Gabon",
    emoji: "๐ฌ๐ฆ",
  },
  {
    name: "United Kingdom",
    emoji: "๐ฌ๐ง",
  },
  {
    name: "Grenada",
    emoji: "๐ฌ๐ฉ",
  },
  {
    name: "Georgia",
    emoji: "๐ฌ๐ช",
  },
  {
    name: "French Guiana",
    emoji: "๐ฌ๐ซ",
  },
  {
    name: "Guernsey",
    emoji: "๐ฌ๐ฌ",
  },
  {
    name: "Ghana",
    emoji: "๐ฌ๐ญ",
  },
  {
    name: "Gibraltar",
    emoji: "๐ฌ๐ฎ",
  },
  {
    name: "Greenland",
    emoji: "๐ฌ๐ฑ",
  },
  {
    name: "Gambia",
    emoji: "๐ฌ๐ฒ",
  },
  {
    name: "Guinea",
    emoji: "๐ฌ๐ณ",
  },
  {
    name: "Guadeloupe",
    emoji: "๐ฌ๐ต",
  },
  {
    name: "Equatorial Guinea",
    emoji: "๐ฌ๐ถ",
  },
  {
    name: "Greece",
    emoji: "๐ฌ๐ท",
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    emoji: "๐ฌ๐ธ",
  },
  {
    name: "Guatemala",
    emoji: "๐ฌ๐น",
  },
  {
    name: "Guam",
    emoji: "๐ฌ๐บ",
  },
  {
    name: "Guinea-Bissau",
    emoji: "๐ฌ๐ผ",
  },
  {
    name: "Guyana",
    emoji: "๐ฌ๐พ",
  },
  {
    name: "Hong Kong",
    emoji: "๐ญ๐ฐ",
  },
  {
    name: "Heard Island and McDonald Islands",
    emoji: "๐ญ๐ฒ",
  },
  {
    name: "Honduras",
    emoji: "๐ญ๐ณ",
  },
  {
    name: "Croatia",
    emoji: "๐ญ๐ท",
  },
  {
    name: "Haiti",
    emoji: "๐ญ๐น",
  },
  {
    name: "Hungary",
    emoji: "๐ญ๐บ",
  },
  {
    name: "Indonesia",
    emoji: "๐ฎ๐ฉ",
  },
  {
    name: "Ireland",
    emoji: "๐ฎ๐ช",
  },
  {
    name: "Israel",
    emoji: "๐ฎ๐ฑ",
  },
  {
    name: "Isle of Man",
    emoji: "๐ฎ๐ฒ",
  },
  {
    name: "India",
    emoji: "๐ฎ๐ณ",
  },
  {
    name: "British Indian Ocean Territory",
    emoji: "๐ฎ๐ด",
  },
  {
    name: "Iraq",
    emoji: "๐ฎ๐ถ",
  },
  {
    name: "Iran",
    emoji: "๐ฎ๐ท",
  },
  {
    name: "Iceland",
    emoji: "๐ฎ๐ธ",
  },
  {
    name: "Italy",
    emoji: "๐ฎ๐น",
  },
  {
    name: "Jersey",
    emoji: "๐ฏ๐ช",
  },
  {
    name: "Jamaica",
    emoji: "๐ฏ๐ฒ",
  },
  {
    name: "Jordan",
    emoji: "๐ฏ๐ด",
  },
  {
    name: "Japan",
    emoji: "๐ฏ๐ต",
  },
  {
    name: "Kenya",
    emoji: "๐ฐ๐ช",
  },
  {
    name: "Kyrgyzstan",
    emoji: "๐ฐ๐ฌ",
  },
  {
    name: "Cambodia",
    emoji: "๐ฐ๐ญ",
  },
  {
    name: "Kiribati",
    emoji: "๐ฐ๐ฎ",
  },
  {
    name: "Comoros",
    emoji: "๐ฐ๐ฒ",
  },
  {
    name: "Saint Kitts and Nevis",
    emoji: "๐ฐ๐ณ",
  },
  {
    name: "North Korea",
    emoji: "๐ฐ๐ต",
  },
  {
    name: "South Korea",
    emoji: "๐ฐ๐ท",
  },
  {
    name: "Kuwait",
    emoji: "๐ฐ๐ผ",
  },
  {
    name: "Cayman Islands",
    emoji: "๐ฐ๐พ",
  },
  {
    name: "Kazakhstan",
    emoji: "๐ฐ๐ฟ",
  },
  {
    name: "Laos",
    emoji: "๐ฑ๐ฆ",
  },
  {
    name: "Lebanon",
    emoji: "๐ฑ๐ง",
  },
  {
    name: "Saint Lucia",
    emoji: "๐ฑ๐จ",
  },
  {
    name: "Liechtenstein",
    emoji: "๐ฑ๐ฎ",
  },
  {
    name: "Sri Lanka",
    emoji: "๐ฑ๐ฐ",
  },
  {
    name: "Liberia",
    emoji: "๐ฑ๐ท",
  },
  {
    name: "Lesotho",
    emoji: "๐ฑ๐ธ",
  },
  {
    name: "Lithuania",
    emoji: "๐ฑ๐น",
  },
  {
    name: "Luxembourg",
    emoji: "๐ฑ๐บ",
  },
  {
    name: "Latvia",
    emoji: "๐ฑ๐ป",
  },
  {
    name: "Libya",
    emoji: "๐ฑ๐พ",
  },
  {
    name: "Morocco",
    emoji: "๐ฒ๐ฆ",
  },
  {
    name: "Monaco",
    emoji: "๐ฒ๐จ",
  },
  {
    name: "Moldova",
    emoji: "๐ฒ๐ฉ",
  },
  {
    name: "Montenegro",
    emoji: "๐ฒ๐ช",
  },
  {
    name: "Saint Martin",
    emoji: "๐ฒ๐ซ",
  },
  {
    name: "Madagascar",
    emoji: "๐ฒ๐ฌ",
  },
  {
    name: "Marshall Islands",
    emoji: "๐ฒ๐ญ",
  },
  {
    name: "North Macedonia",
    emoji: "๐ฒ๐ฐ",
  },
  {
    name: "Mali",
    emoji: "๐ฒ๐ฑ",
  },
  {
    name: "Myanmar [Burma]",
    emoji: "๐ฒ๐ฒ",
  },
  {
    name: "Mongolia",
    emoji: "๐ฒ๐ณ",
  },
  {
    name: "Macao",
    emoji: "๐ฒ๐ด",
  },
  {
    name: "Northern Mariana Islands",
    emoji: "๐ฒ๐ต",
  },
  {
    name: "Martinique",
    emoji: "๐ฒ๐ถ",
  },
  {
    name: "Mauritania",
    emoji: "๐ฒ๐ท",
  },
  {
    name: "Montserrat",
    emoji: "๐ฒ๐ธ",
  },
  {
    name: "Malta",
    emoji: "๐ฒ๐น",
  },
  {
    name: "Mauritius",
    emoji: "๐ฒ๐บ",
  },
  {
    name: "Maldives",
    emoji: "๐ฒ๐ป",
  },
  {
    name: "Malawi",
    emoji: "๐ฒ๐ผ",
  },
  {
    name: "Mexico",
    emoji: "๐ฒ๐ฝ",
  },
  {
    name: "Malaysia",
    emoji: "๐ฒ๐พ",
  },
  {
    name: "Mozambique",
    emoji: "๐ฒ๐ฟ",
  },
  {
    name: "Namibia",
    emoji: "๐ณ๐ฆ",
  },
  {
    name: "New Caledonia",
    emoji: "๐ณ๐จ",
  },
  {
    name: "Niger",
    emoji: "๐ณ๐ช",
  },
  {
    name: "Norfolk Island",
    emoji: "๐ณ๐ซ",
  },
  {
    name: "Nigeria",
    emoji: "๐ณ๐ฌ",
  },
  {
    name: "Nicaragua",
    emoji: "๐ณ๐ฎ",
  },
  {
    name: "Netherlands",
    emoji: "๐ณ๐ฑ",
  },
  {
    name: "Norway",
    emoji: "๐ณ๐ด",
  },
  {
    name: "Nepal",
    emoji: "๐ณ๐ต",
  },
  {
    name: "Nauru",
    emoji: "๐ณ๐ท",
  },
  {
    name: "Niue",
    emoji: "๐ณ๐บ",
  },
  {
    name: "New Zealand",
    emoji: "๐ณ๐ฟ",
  },
  {
    name: "Oman",
    emoji: "๐ด๐ฒ",
  },
  {
    name: "Panama",
    emoji: "๐ต๐ฆ",
  },
  {
    name: "Peru",
    emoji: "๐ต๐ช",
  },
  {
    name: "French Polynesia",
    emoji: "๐ต๐ซ",
  },
  {
    name: "Papua New Guinea",
    emoji: "๐ต๐ฌ",
  },
  {
    name: "Philippines",
    emoji: "๐ต๐ญ",
  },
  {
    name: "Pakistan",
    emoji: "๐ต๐ฐ",
  },
  {
    name: "Poland",
    emoji: "๐ต๐ฑ",
  },
  {
    name: "Saint Pierre and Miquelon",
    emoji: "๐ต๐ฒ",
  },
  {
    name: "Pitcairn Islands",
    emoji: "๐ต๐ณ",
  },
  {
    name: "Puerto Rico",
    emoji: "๐ต๐ท",
  },
  {
    name: "Palestine",
    emoji: "๐ต๐ธ",
  },
  {
    name: "Portugal",
    emoji: "๐ต๐น",
  },
  {
    name: "Palau",
    emoji: "๐ต๐ผ",
  },
  {
    name: "Paraguay",
    emoji: "๐ต๐พ",
  },
  {
    name: "Qatar",
    emoji: "๐ถ๐ฆ",
  },
  {
    name: "Rรฉunion",
    emoji: "๐ท๐ช",
  },
  {
    name: "Romania",
    emoji: "๐ท๐ด",
  },
  {
    name: "Serbia",
    emoji: "๐ท๐ธ",
  },
  {
    name: "Russia",
    emoji: "๐ท๐บ",
  },
  {
    name: "Rwanda",
    emoji: "๐ท๐ผ",
  },
  {
    name: "Saudi Arabia",
    emoji: "๐ธ๐ฆ",
  },
  {
    name: "Solomon Islands",
    emoji: "๐ธ๐ง",
  },
  {
    name: "Seychelles",
    emoji: "๐ธ๐จ",
  },
  {
    name: "Sudan",
    emoji: "๐ธ๐ฉ",
  },
  {
    name: "Sweden",
    emoji: "๐ธ๐ช",
  },
  {
    name: "Singapore",
    emoji: "๐ธ๐ฌ",
  },
  {
    name: "Saint Helena",
    emoji: "๐ธ๐ญ",
  },
  {
    name: "Slovenia",
    emoji: "๐ธ๐ฎ",
  },
  {
    name: "Svalbard and Jan Mayen",
    emoji: "๐ธ๐ฏ",
  },
  {
    name: "Slovakia",
    emoji: "๐ธ๐ฐ",
  },
  {
    name: "Sierra Leone",
    emoji: "๐ธ๐ฑ",
  },
  {
    name: "San Marino",
    emoji: "๐ธ๐ฒ",
  },
  {
    name: "Senegal",
    emoji: "๐ธ๐ณ",
  },
  {
    name: "Somalia",
    emoji: "๐ธ๐ด",
  },
  {
    name: "Suriname",
    emoji: "๐ธ๐ท",
  },
  {
    name: "South Sudan",
    emoji: "๐ธ๐ธ",
  },
  {
    name: "Sรฃo Tomรฉ and Prรญncipe",
    emoji: "๐ธ๐น",
  },
  {
    name: "El Salvador",
    emoji: "๐ธ๐ป",
  },
  {
    name: "Sint Maarten",
    emoji: "๐ธ๐ฝ",
  },
  {
    name: "Syria",
    emoji: "๐ธ๐พ",
  },
  {
    name: "Swaziland",
    emoji: "๐ธ๐ฟ",
  },
  {
    name: "Turks and Caicos Islands",
    emoji: "๐น๐จ",
  },
  {
    name: "Chad",
    emoji: "๐น๐ฉ",
  },
  {
    name: "French Southern Territories",
    emoji: "๐น๐ซ",
  },
  {
    name: "Togo",
    emoji: "๐น๐ฌ",
  },
  {
    name: "Thailand",
    emoji: "๐น๐ญ",
  },
  {
    name: "Tajikistan",
    emoji: "๐น๐ฏ",
  },
  {
    name: "Tokelau",
    emoji: "๐น๐ฐ",
  },
  {
    name: "East Timor",
    emoji: "๐น๐ฑ",
  },
  {
    name: "Turkmenistan",
    emoji: "๐น๐ฒ",
  },
  {
    name: "Tunisia",
    emoji: "๐น๐ณ",
  },
  {
    name: "Tonga",
    emoji: "๐น๐ด",
  },
  {
    name: "Turkey",
    emoji: "๐น๐ท",
  },
  {
    name: "Trinidad and Tobago",
    emoji: "๐น๐น",
  },
  {
    name: "Tuvalu",
    emoji: "๐น๐ป",
  },
  {
    name: "Taiwan",
    emoji: "๐น๐ผ",
  },
  {
    name: "Tanzania",
    emoji: "๐น๐ฟ",
  },
  {
    name: "Ukraine",
    emoji: "๐บ๐ฆ",
  },
  {
    name: "Uganda",
    emoji: "๐บ๐ฌ",
  },
  {
    name: "U.S. Minor Outlying Islands",
    emoji: "๐บ๐ฒ",
  },
  {
    name: "United States",
    emoji: "๐บ๐ธ",
  },
  {
    name: "Uruguay",
    emoji: "๐บ๐พ",
  },
  {
    name: "Uzbekistan",
    emoji: "๐บ๐ฟ",
  },
  {
    name: "Vatican City",
    emoji: "๐ป๐ฆ",
  },
  {
    name: "Saint Vincent and the Grenadines",
    emoji: "๐ป๐จ",
  },
  {
    name: "Venezuela",
    emoji: "๐ป๐ช",
  },
  {
    name: "British Virgin Islands",
    emoji: "๐ป๐ฌ",
  },
  {
    name: "U.S. Virgin Islands",
    emoji: "๐ป๐ฎ",
  },
  {
    name: "Vietnam",
    emoji: "๐ป๐ณ",
  },
  {
    name: "Vanuatu",
    emoji: "๐ป๐บ",
  },
  {
    name: "Wallis and Futuna",
    emoji: "๐ผ๐ซ",
  },
  {
    name: "Samoa",
    emoji: "๐ผ๐ธ",
  },
  {
    name: "Kosovo",
    emoji: "๐ฝ๐ฐ",
  },
  {
    name: "Yemen",
    emoji: "๐พ๐ช",
  },
  {
    name: "Mayotte",
    emoji: "๐พ๐น",
  },
  {
    name: "South Africa",
    emoji: "๐ฟ๐ฆ",
  },
  {
    name: "Zambia",
    emoji: "๐ฟ๐ฒ",
  },
  {
    name: "Zimbabwe",
    emoji: "๐ฟ๐ผ",
  },
];

export default countries;
