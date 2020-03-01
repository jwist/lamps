function includeHTML() {
    var z, i, elmnt, file, xhttp, xjson;
    xjson = {
        chair:'Julien Wist',
        chairAff:'Universidad del Valle, Colombia',
        programCommitteeChair:'María Eugenia Monge',
        programCommitteeChairAff:'CIBION-CONICET, Argentina',
        programCommittee1:'Freddy Ramos',
        programCommittee1Aff:'Universidad Nacional de Colombia, Colombia',
        programCommittee2:'Elaine Holmes',
        programCommittee2Aff:'Murdoch University, Australia',
        programCommittee3:'Antonio Gilberto Ferreira',
        programCommittee3Aff:'Universidade Federal de São Carlos',
        steeringCommitteeChair: 'Monica Cala',
        steeringCommitteeChairAff: 'Universidad de los Andes, Colombia',
        steeringCommittee1: 'Mildrey Mosquera',
        steeringCommittee1Aff: 'Universidad del Valle, Colombia',
    };
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = replaceHTML(this.responseText, xjson);}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

  function replaceHTML(txt, dictionary) {

    Object.keys(dictionary).forEach((e, i) => {
        let rep = '\\$' + e + '\\$';
        let regex = new RegExp(rep, 'g');
        console.log(regex);

        txt = txt.replace(regex, dictionary[e]);
    });
    return txt;
  }