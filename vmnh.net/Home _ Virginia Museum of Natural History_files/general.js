	function MM_swapImgRestore() { //v3.0
	  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
	}
	function MM_preloadImages() { //v3.0
	  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
	}
	
	function MM_findObj(n, d) { //v4.01
	  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	  if(!x && d.getElementById) x=d.getElementById(n); return x;
	}
	
	function MM_swapImage() { //v3.0
	  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
	}

	function expandCollapse() {
	  for (var i=0; i<expandCollapse.arguments.length; i++) {
		var element = document.getElementById(expandCollapse.arguments[i]);
		element.style.display = (element.style.
		display == "none") ? "block" : "none";
	  }
	}
	function expandDiv() {
	  for (var i=0; i<expandDiv.arguments.length; i++) {
		var element = document.getElementById(expandDiv.arguments[i]);
		if(element != null)
		{
			element.style.display = "block";
		}
	  }
	}
	function collapseDiv() {
	  for (var i=0; i<collapseDiv.arguments.length; i++) {
		var element = document.getElementById(collapseDiv.arguments[i]);
		if(element != null)
		{
			element.style.display = "none";
		}
	  }
	}
	//function for checkbox and radio buttns to toggle container divs open or closed.
	function toggleDiv(triggerElem, elemToToggle) {
		var propChecked = document.getElementById(triggerElem).hasAttribute('checked');
		var displayValue = document.getElementById(elemToToggle).style.display;
		if(propChecked && displayValue == 'none') {
			expandDiv(elemToToggle);
		} else if (propChecked && displayValue == 'block') {
			collapseDiv(elemToToggle);
		} else if (!propChecked && displayValue == 'block') {
			collapseDiv(elemToToggle);
		} else if(!propChecked && displayValue == 'none') {
			expandDiv(elemToToggle);
		}
	}
	function expandAll() {
	  for (var i=0; i<expandAll.arguments.length; i++) {
		var element = document.getElementById(expandAll.arguments[i]);
		element.style.display = "block";
	  }
	}
	function collapseAll() {
	  for (var i=0; i<collapseAll.arguments.length; i++) {
		var element = document.getElementById(collapseAll.arguments[i]);
		element.style.display = "none";
	  }
	}
	// swaps value in field2 with value in field1
	function swapFieldValues(field1,field2,cField,changeValue) {
	  var controlOptions = document.getElementsByName(cField);
	  optCnt = controlOptions.length;
	  if(optCnt > 1)
	  {
	    for(i=0; i<optCnt; i++)
		{
		  optChecked = controlOptions.item(i).checked;
		  if(optChecked)
		  {
			  testValue = controlOptions.item(i).value;
		  }
		}
	  }
	  if(testValue == changeValue)
	  {
	    if(document.getElementById(field1) == null || document.getElementById(field2) == null) {
	    } else {
		  var e1 = document.getElementById(field1);
		  var e2 = document.getElementById(field2);
		  e2.value = e1.value;
	    }
	  }
	}
	
	// swaps values for fields in list2 with values for fields in list1
	function swapListValues(list1,list2,cField,changeValue) {
	  var controlOptions = document.getElementsByName(cField);
	  optCnt = controlOptions.length;
	  if(optCnt > 1)
	  {
	    for(i=0; i<optCnt; i++)
		{
		  optChecked = controlOptions.item(i).checked;
		  if(optChecked)
		  {
			  testValue = controlOptions.item(i).value;
		  }
		}
	  }
	  if(testValue == changeValue)
	  {
	    var list1Array = list1.split( "," );
	    var list2Array = list2.split( "," );
	    var f1Cnt = list1Array.length;
	    var f2Cnt = list2Array.length;
	    if (f1Cnt == f2Cnt)
	    {
		  for (var i=0; i<f1Cnt; i++) {
		    swapFieldValues(list1Array[i],list2Array[i],cField,changeValue);
	   	  }
	    }
	  }
	}
	
	// clears values for fields in list
	function clearListValues(list) {
	  var listArray = list.split( "," );
	  var fCnt = listArray.length;
	  for (var i=0; i<fCnt; i++) {
		if(document.getElementById(listArray[i]) == null) {
		} else {
		  var e = document.getElementById(listArray[i]);
		  e.value = '';
		}
	  }
	}

	// clears values for fields in list
	function resetDefaultValues(list,defaults) {
	  var listArray = list.split( "," );
	  var defaultsArray = defaults.split( "," );
	  var fCnt = listArray.length;
	  for (var i=0; i<fCnt; i++) {
		if(document.getElementById(listArray[i]) == null) {
		} else {
		  var e = document.getElementById(listArray[i]);
		  var d = defaultsArray[i];
		  e.value = d;
		}
	  }
	}

	
	// clears values for fields in list
	function countryStateDropdownCheck(stateField,countryField) {
	  countryValue = document.getElementById(countryField).value;
	  if (countryValue != "US" && countryValue != "CA")
	  {
		  document.getElementById(stateField).value = "UL";
		  document.getElementById(stateField).disabled = true;
	  } else {
		  document.getElementById(stateField).disabled = false;
	  }
	}

	// clears values for fields in list
	function countryStateDropdownCheck2(stateField,countryField,stateArray,selectText,setCountry) {
	  if(setCountry != '')
	  {
	    countryValue = setCountry;
	  } else {
	    countryValue = document.getElementById(countryField).value;
	  }
	  if (countryValue != "US" && countryValue != "CA" && countryValue != "BR")
	  {
		  document.getElementById(stateField).value = "UL";
		  document.getElementById(stateField).disabled = true;
	  } else {
		  if(countryValue == "US")
		  {
		  	sStateArray = stateArray[0];
		  } else if (countryValue == "CA") {
		  	sStateArray = stateArray[1];
		  } else if (countryValue == "BR") {
		  	sStateArray = stateArray[2];
		  }
		  selectPopulate2DimArray(stateField, sStateArray, selectText)
		  document.getElementById(stateField).disabled = false;
	  }
	}

	function selectChange(controlField, controlFieldToPopulate, OptionArray, theText) {
	  var myEle ;
	  var x ;
	  var control = document.getElementById(controlField);
	  var controlToPopulate = document.getElementById(controlFieldToPopulate);
	  controlToPopulate.disabled=false;
	  // Empty the second drop down box of any choices
	  for (var q=controlToPopulate.options.length;q>=0;q--) controlToPopulate.options[q]=null;
	  // ADD Default Choice - in case there are no values
	  myEle=document.createElement("option");
	  myEle.setAttribute("value","");
      txt = document.createTextNode(theText);
	  myEle.appendChild(txt);
	  controlToPopulate.appendChild(myEle);
	  // Now loop through the array of individual items
	  // Any containing the same child id are added to
	  // the second dropdown box
	  if (control.value == "" || OptionArray.length == 0)
	  {
		controlToPopulate.disabled=true;
	  } else {
		for ( x = 0 ; x < OptionArray.length  ; x++ ) 
		{
			myEle = document.createElement("option") ;
			//myEle.value = x ;
			myEle.setAttribute("value",OptionArray[x][0]);
			// myEle.text = ItemArray[x] ;
      		txt = document.createTextNode(OptionArray[x][1]);
			myEle.appendChild(txt)
			// controlToPopulate.add(myEle) ;
			controlToPopulate.appendChild(myEle)
		}
	  }
	}

	function selectPopulate(fieldToPopulate, OptionArray, theText) {
	  var myEle ;
	  var x ;
	  var controlToPopulate = document.getElementById(fieldToPopulate);
	  var selectedValue = controlToPopulate.value;
	  controlToPopulate.disabled=false;
	  // Empty the second drop down box of any choices
	  for (var q=controlToPopulate.options.length;q>=0;q--) controlToPopulate.options[q]=null;
	  // ADD Default Choice - in case there are no values
	  myEle=document.createElement("option");
	  myEle.setAttribute("value","");
      txt = document.createTextNode(theText);
	  myEle.appendChild(txt);
	  controlToPopulate.appendChild(myEle);
	  // Now loop through the array of individual items
	  // Any containing the same child id are added to
	  // the second dropdown box
		for ( x = 0 ; x < OptionArray.length  ; x++ ) 
		{
			myEle = document.createElement("option") ;
			//myEle.value = x ;
			myEle.setAttribute("value",OptionArray[x]);
			// myEle.text = ItemArray[x] ;
			if(selectedValue == OptionArray[x])
			{
				myEle.selected = true;
			}
      		txt = document.createTextNode(OptionArray[x]);
			myEle.appendChild(txt)
			// controlToPopulate.add(myEle) ;
			controlToPopulate.appendChild(myEle)
		}
	}

	function selectPopulate2DimArray(fieldToPopulate, OptionArray, theText) {
	  var myEle ;
	  var x ;
	  var controlToPopulate = document.getElementById(fieldToPopulate);
	  var selectedValue = controlToPopulate.value;
	  controlToPopulate.disabled=false;
	  // Empty the second drop down box of any choices
	  for (var q=controlToPopulate.options.length;q>=0;q--) controlToPopulate.options[q]=null;
	  // ADD Default Choice - in case there are no values
	  myEle=document.createElement("option");
	  myEle.setAttribute("value","");
      txt = document.createTextNode(theText);
	  myEle.appendChild(txt);
	  controlToPopulate.appendChild(myEle);
	  // Now loop through the array of individual items
	  // Any containing the same child id are added to
	  // the second dropdown box
		for ( x = 0 ; x < OptionArray.length  ; x++ ) 
		{
			myEle = document.createElement("option") ;
			//myEle.value = x ;
			myEle.setAttribute("value",OptionArray[x][0]);
			// myEle.text = ItemArray[x] ;
			if(selectedValue == OptionArray[x][0])
			{
				myEle.selected = true;
			}
      		txt = document.createTextNode(OptionArray[x][1] + " (" + OptionArray[x][0] + ")");
			myEle.appendChild(txt)
			// controlToPopulate.add(myEle) ;
			controlToPopulate.appendChild(myEle)
		}
	}

	//function to check valid email address
	function isValidEmail(strEmail){
	  validRegExp = /^[^@]+@[^@]+.[a-z]{2,}$/i;
	  strEmail = document.forms[0].email.value;
	
	   // search email text for regular exp matches
		if (strEmail.search(validRegExp) == -1) 
	    {
		  return false;
		} 
		return true; 
	}
	
	//function to check valid email address
	function checkForValidEmail(fieldName){
	  validRegExp = /^[^@]+@[^@]+.[a-z]{2,}$/i;
	  strEmail = document.getElementById(fieldName).value;
	
	   // search email text for regular exp matches
		if (strEmail.search(validRegExp) == -1) 
	    {
		  return false;
		} 
		return true; 
	}
	


	function checkfield(submitField,field,messageField,minLength,resultDivID)
	{
		var sfield = document.getElementById(field);
		var fvalue = sfield.value;
		var results = fvalue.replace(' ','');
		var rLen = results.length;
		validationDivID = resultDivID;
		validEmail = true;
		// check email addresses
		if(field == "email" || field == "email_address")
		{
			validEmail = isValidEmail(fvalue);
		}
		if(fvalue == "" || rLen < minLength || !validEmail)
		{
			// create new span tag for new field message
			nMsg = document.createElement('span');
			// set span id value
			nMsg.id = "m_"+field;
			// set span class name for styling
			nMsg.className = "form_message";
			// set html inside span
			if(!validEmail)
			{
			  nMsg.innerHTML = "A valid e-mail address is required.";
			} else {
			  nMsg.innerHTML = messageField+" is required.";
			}
			// get all the messages that have been added to the - validation_result div
			vMsgs = document.getElementById(validationDivID).childNodes;
			msgCnt = vMsgs.length;
			addMsg = true;
			// loop thru each message
			for (i = 0; i < msgCnt; i ++)
			{
				cMsg = vMsgs.item(i);
				// if a message is found with same id as we want to create no need to add message
				if(cMsg.id == nMsg.id)
				{
					addMsg = false;
					break;
				}
			}
			// if no message found for selected field add message and mark field as required
			if(addMsg)
			{
			  curClass = sfield.className;
			  sfield.className = curClass+' required';
			  document.getElementById(validationDivID).appendChild(nMsg);
			}
			document.getElementById(submitField).disabled = true;
			submitForm = false;
		} else {
			submitForm = true;
			var sClass = sfield.className;
			// remove 'required' class from the selected field
			var results = sClass.replace(' required','');
			sfield.className = results;
			sid = "m_"+field;
			sMsgNode = document.getElementById(sid);
			// get all the messages that have been added to the - validation_result div
			removeMsg = false;
			vMsgs = document.getElementById(validationDivID).childNodes;
			msgCnt = vMsgs.length;
			// loop thru each message
			for (i = 0; i < msgCnt; i ++)
			{
				cMsg = vMsgs.item(i);
				// if a message is found with same id as we want to remove mark to remove the selected id
				if(cMsg.id == sid)
				{
					removeMsg = true;
					break;
				}
			}
			// if message found for selected field remove selected message
			if(removeMsg)
			{
			  document.getElementById(validationDivID).removeChild(sMsgNode);
			  // only re - enable submit button if message we just removed was the last one
			  if(msgCnt == 1)
			  {
			    document.getElementById(submitField).disabled = false;
			  }
			}
		}
		return submitForm;
	}
	
	function resetRequiredFormFields(submitField,fieldlist,resultDivID)
	{
	  var listArray = fieldlist.split( "," );
	  var fCnt = listArray.length;
	  var defaultResultID = 'validation_result';
	  if(resultDivID == "")
	  {
		validationDivID = defaultResultID
	  } else {
		validationDivID = resultDivID
	  }
	  for (var i=0; i<fCnt; i++) 
	  {
		fieldID = listArray[i];
		var sfield = document.getElementById(fieldID);
		if(sfield != null)
		{
		  var fvalue = sfield.value;
		  var results = fvalue.replace(fvalue,'');
		  if(sfield.id == 'cc_exp_mo' || sfield.id == 'cc_exp_yr') {
		  	sfield.value = fvalue;
		  } else {
		  	sfield.value = results;
		  }
		  var rLen = results.length;
		  var sClass = sfield.className;
		  // remove 'required' class from the selected field
		  var results = sClass.replace(' required','');
		}
	  }
	  document.getElementById(validationDivID).innerHTML = "";
      document.getElementById(submitField).disabled = false;
	}
	
	
	function submitEnableDisable(requiredFieldID,submitField)
    {
	  requiredFieldValue = document.getElementById(requiredFieldID).checked;
	  if(requiredFieldValue == true)
	  {
		document.getElementById(submitField).disabled = false;
	  } else {
		document.getElementById(submitField).disabled = true;
	  }
	}

	function submitform(formID)
    {
      document.getElementById(formID).submit();
    }

	function submitformWithSumbitBtnValue(formID,submitBtnValue)
    {
	  document.getElementById("action2").value = submitBtnValue;
      document.getElementById(formID).submit();
    }

	function changeDivContents(divID,newContents)
    {
      var divElement = document.getElementById(divID);
	  if(divElement != null)
	  {
	    divElement.innerHTML = newContents;
	  }
    }


	function changeImage(imageID,newImageURL)
    {
      var imgElement = document.getElementById(imageID);
	  if(imgElement != null)
	  {
	  	imgElement.src = newImageURL;
	  }
    }

	function CheckAll(formID) {
	var ml = document.getElementById(formID);
	var len = ml.elements.length-1;
	 for ( var i=0; i < len; i++)
	 ml.elements[i].checked = true;
	}

	function UnCheckAll(formID)
	{
	var ml = document.getElementById(formID);
	 var len = ml.elements.length-1;
	for ( var i=0; i < len; i++)
	  ml.elements[i].checked = false;
	}
	
	function gotoSelectedURL(baseurl, selectID, lastparurl)
	{
		var s1 = document.getElementById(selectID);
		svalue = s1.value;
		var newurl = baseurl + '' + svalue + '' + lastparurl;
		self.location.href = newurl;
	}
	
	function changeFormFieldValue(field_id, new_value) {
		document.getElementById(field_id).value = new_value;
	}

	function CheckSelectedOption(elem_to_check, value) {
		var elem_array = document.getElementsByName(elem_to_check);
		for(var i=0; i<elem_array.length; i++) {
			if(elem_array[i].type === "radio" && elem_array[i].defaultValue == value) {
				elem_array[i].checked = true;
			}
		}
	}

	function disableFields(idlist) {
		if(idlist.length > 1) {
			var ids = idlist.split(',');
			for(var i=0; i<ids.length; i++) {
				document.getElementById(ids[i]).disabled = true;
			}
		} else {
			document.getElementById(idlist).disabled = true;
		}
	}
	function enableFields(idlist) {
		if(idlist.length > 1) {
			var ids = idlist.split(',');
			for(var i=0; i<ids.length; i++) {
				document.getElementById(ids[i]).disabled = false;
			}
		} else {
			document.getElementById(idlist).disabled = false;
		}
	}
	function textChanged (form, selected_field, keytotal) {
		var s = selected_field.name;
		var index;
			
		if (s.indexOf('[') == -1) {
			index = 0;
		} else {
			index = s.substring( s.indexOf('[')+1,s.indexOf(']') );
		}
	
		checkit(selected_field,index, keytotal);
	}

	function checkit(selected_field,zindex, keytotal) {
		if (!(zindex >= 0)) {
			zindex = '';
		}
	
		var s = selected_field.name;
		var zindex;
	
		if (s.indexOf('[') == -1) {
			zindex = 0;
		} else {
			zindex = s.substring( s.indexOf('[')+1,s.indexOf(']') );
		}
	
		if (selected_field.value.length > keytotal) {
			selected_field.value = selected_field.value.substring(0,keytotal);
		}
	
		if (document.getElementById('charCountB'+zindex)) {
			document.getElementById('charCountB'+zindex).innerHTML = selected_field.value.length;
		}

		console.log(selected_field.value.length);
	}