function includeHTML() {
    var z, i, elmnt, file, xhttp, xjson;
    xjson = {
        chair:'Julien Wist',
        chair2:'María Eugenia Monge'
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
    console.log(Object.keys(dictionary));

    Object.keys(dictionary).forEach((e, i) => {
        let rep = '$' + e;
        txt.replace(rep, dictionary[e]);
    });
    console.log(txt.replace('chair', 'test'));
    return txt;
  }