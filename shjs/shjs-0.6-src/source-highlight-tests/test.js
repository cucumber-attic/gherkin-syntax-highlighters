
/*
* Sarissa XML library v 0.9 beta 4
* Author: Manos Batsis, mailto: mbatsis@netsmart.gr
*
* This source code is distributed under the GNU GPL version 2 (see sarissa_license_gpl.txt) or higher, if 
* a more recent version has been released.
* In case your copy of Sarissa does not include a copy of the license, you may find it online at 
* http://www.gnu.org/copyleft/gpl.html
*/

// some basic browser detection
var _SARISSA_IS_IE = (navigator.userAgent.toLowerCase().indexOf("msie") > -1)?true:false;
var _SARISSA_IS_MOZ = (document.implementation && document.implementation.createDocument)?true:false;
var _sarissa_iNsCounter = 0;
var _SARISSA_IEPREFIX4XSLPARAM = "";
if (_SARISSA_IS_MOZ)
{
	//============================================
	// Section: Factory methods for Moz
	//============================================
	// @param sUri the namespace of the root node (if any)
	// @param sUri the local name of the root node (if any)
	// @return a DOM Document
	Sarissa.getDomDocument = function(sUri, sName)
	{
		var oDoc = document.implementation.createDocument(sUri, sName, null);
		oDoc.addEventListener("load", _sarissa__XMLDocument_onload, false);
		return oDoc;
	};
	// AFAIK, the object behaves exactly like 
	// IE's IXMLHTTPRequest)
	// @return a XmlHttpRequst object suitable for Moz
	Sarissa.getXmlHttpRequest = function()
	{
		return new XMLHttpRequest();
	};
	//============================================
	// Section: utility functions for internal use
	//============================================
	// Attached by an event handler to the load event.
	function _sarissa__XMLDocument_onload()
	{
		_sarissa_loadHandler(this);
	};
	// Ensures the document was loaded correctly, otherwise sets the parseError to -1
	// to indicate something went wrong.
	function _sarissa_loadHandler(oDoc)
	{
		if (!oDoc.documentElement || oDoc.documentElement.tagName == "parsererror")
			oDoc.parseError = -1;
		_sarissa_setReadyState(oDoc, 4);
	};
	// Sets the readyState property
	function _sarissa_setReadyState(oDoc, iReadyState) 
	{
		oDoc.readyState = iReadyState;
		if (oDoc.onreadystatechange != null && typeof oDoc.onreadystatechange == "function")
			oDoc.onreadystatechange();
	};
	
	XMLDocument.prototype._sarissa_clearDOM = function()
	{
		while(this.hasChildNodes())
			this.removeChild(this.firstChild);
	}
	// Replaces the contents of the object with the contents of 
	// the object given as the parameter
	XMLDocument.prototype._sarissa_copyDOM = function(oDoc)
	{
		this._sarissa_clearDOM();
		// importNode is not yet needed in Moz due to a bug but it will be 
		// fixed so...
            var oNodes = oDoc.childNodes;
            for(i=0;i<oNodes.length;i++)
                  this.appendChild(this.importNode(oNodes[i], true));
	};
	var _SARISSA_WSMULT = new RegExp("^\\s*|\\s*$", "g");
	var _SARISSA_WSENDS = new RegExp("\\s\\s+", "g");
	function _sarissa_normalizeText(sIn)
	{
		return sIn.replace(_SARISSA_WSENDS, " ").replace(_SARISSA_WSMULT, " ");
	}
	//============================================
	// Section: Extending Mozilla's DOM implementation 
	// to emulate IE extentions
	//============================================
	// Parses the String given as parameter to build the document content
	// for the object, exactly like IE's loadXML().
	// @return the old contents serialized to String (xml)
	XMLDocument.prototype.loadXML = function(strXML) 
	{
		_sarissa_setReadyState(this, 1);
		var sOldXML = this.xml;
		var oDoc = (new DOMParser()).parseFromString(strXML, "text/xml");
		_sarissa_setReadyState(this, 2);
		this._sarissa_copyDOM(oDoc);
		_sarissa_setReadyState(this, 3);
		_sarissa_loadHandler(this);
		return sOldXML;
	};
	// Emulates IE's xml property. Gives an XML serialization of the DOM Object
    XMLDocument.prototype.__defineGetter__("xml", function ()
	{
		return (new XMLSerializer()).serializeToString(this);
	});
	// Emulates IE's xml property. Gives an XML serialization of the DOM Object
    Node.prototype.__defineGetter__("xml", function ()
	{
		return (new XMLSerializer()).serializeToString(this);
	});
	// Ensures and informs the xml property is read only
	XMLDocument.prototype.__defineSetter__("xml", function ()
	{
		throw "Invalid assignment on read-only property 'xml'. Hint: Use the 'loadXML(String xml)' method instead. (original exception: "+e+")";
	});
	// Emulates IE's innerText (write). Note that this removes all childNodes of 
	// an Element and just replaces it with a textNode
	HTMLElement.prototype.__defineSetter__("innerText", function (sText)
	{
		var s = "" + sText;
		this.innerHTML = s.replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	});
	// Emulate IE's innerText (read). Gives the concatenation of all text nodes under the Element
	HTMLElement.prototype.__defineGetter__("innerText", function ()
	{
		return _sarissa_normalizeText(this.innerHTML.replace(/<[^>]+>/g,""));
	});
	// Emulate IE's onreadystatechange attribute 
	// used as a listener to the onreadystatechange event (also emulated)
    Document.prototype.onreadystatechange = null;
    // Emulate IE's parseError attribute
    Document.prototype.parseError = 0;
	// Emulates IE's readyState property, which always gives an integer from 0 to 4:
	// 1 == LOADING
	// 2 == LOADED
	// 3 == INTERACTIVE
	// 4 == COMPLETED 
    XMLDocument.prototype.readyState = 0;
	// Emulates IE's async property. It controls whether loading of 
	// remote XML files works synchronously or asynchronously.
	// NOTE: setting async to false will only work with documents 
	// called over HTTP (meaning a server), not the local file system,
	// unless you are using Moz 1.4.
	// BTW the try>catch block is for 1.4; I haven't found a way to check if the property is implemented without 
	// causing an error and I dont want to use user agent stuff for that...
	try{
		XMLDocument.prototype.async = true;
	}catch(e){/*trap*/}
	// Keeps a handle to the original load() method
	XMLDocument.prototype._sarissa_load = XMLDocument.prototype.load;
	/** Extends the load method to provide synchronous loading
	* using an XMLHttpRequest object (if async is set to false)
	* @return the DOM Object as it was before the load() call (may be empty)
	*/
    XMLDocument.prototype.load = function(sURI)
	{
		var oDoc = document.implementation.createDocument("", "", null);
		oDoc._sarissa_copyDOM(this);
		this.parseError = 0;
		_sarissa_setReadyState(this, 1);
		try
		{
			if(this.async == false)
			{
				var tmp = new XMLHttpRequest();
				tmp.open("GET", sURI, false);
				tmp.overrideMimeType("text/xml");
				tmp.send(null);
				_sarissa_setReadyState(this, 2);
				this._sarissa_copyDOM(tmp.responseXML);
				_sarissa_setReadyState(this, 3);
			}
			else
				this._sarissa_load(sURI);
		}
		catch (objException)
		{
			this.parseError = -1;
		}
		finally
		{
			_sarissa_loadHandler(this);
		}
		return oDoc;
	}; 
	// Emulate IE's transformNodeToObject
	Document.prototype.transformNodeToObject = function(xslDoc, oResult)
	{
		var xsltProcessor = null;
		try
		{
		    xsltProcessor = new XSLTProcessor();
		    if(xsltProcessor.reset)
		    {
				// new nsIXSLTProcessor is available
				xsltProcessor.importStylesheet(xslDoc);
				var newFragment = xsltProcessor.transformToFragment(this, oResult);
				oResult._sarissa_copyDOM(newFragment);
            }
            else
		    {
				// only nsIXSLTProcessorObsolete is available
				xsltProcessor.transformDocument(this, xslDoc, oResult, null);
            }
		}
		catch(e)
		{
			if(xslDoc && oResult)
				throw "Sarissa_TransformNodeToObjectException: Failed to transform document. (original exception: "+e+")";
			else if(!xslDoc)
				throw "Sarissa_TransformNodeToObjectException: No Stylesheet Document was provided. (original exception: "+e+")";
			else if(!oResult)
				throw "Sarissa_TransformNodeToObjectException: No Result Document was provided. (original exception: "+e+")";
			else if(xsltProcessor == null)
                            throw "Sarissa_XSLTProcessorNotAvailableException: Could not instantiate an XSLTProcessor object. (original exception: "+e+")";
                        else
                            throw e;
		}
	};
	// Emulate IE's transformNode() method. Gives the result XML serialised to a String
	Document.prototype.transformNode = function(xslDoc)
	{
		var out = document.implementation.createDocument("", "", null);
		this.transformNodeToObject(xslDoc, out);
		var str = null;
		try
		{
			var serializer = new XMLSerializer();
			str = serializer.serializeToString(out);
		}
		catch(e)
		{
			throw "Sarissa_TransformNodeException: Failed to serialize result document. (original exception: "+e+")";
		}
		return str;
	};
	// Extend the Array to behave as a NodeList	
	Array.prototype.item = function(i)
	{
		return this[i];
	};
	// add IE's expr property
	Array.prototype.expr = "";
    // dummy, used to accept IE's stuff without throwing errors
	XMLDocument.prototype.setProperty  = function(x,y){};
	// Emulate IE's selectNodes
	XMLDocument.prototype.selectNodes = function(sExpr, contextNode)
	{
		var oResult = this.evaluate(sExpr, (contextNode?contextNode:this), 
							this.createNSResolver(this.documentElement),
							XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodeList = new Array(oResult.snapshotLength);
		nodeList.expr = sExpr;
		for(i=0;i<nodeList.length;i++)
			nodeList[i] = oResult.snapshotItem(i);
		return nodeList;
	};
	Element.prototype.selectNodes = function(sExpr)
	{
		var doc = this.ownerDocument;
		if(doc.selectNodes)
			return doc.selectNodes(sExpr, this);
		else
			throw "SarissaXPathOperationException: Method selectNodes is only supported by XML Nodes";
	};
	// Emulate IE's selectSingleNode
	XMLDocument.prototype.selectSingleNode = function(sExpr, contextNode)
	{
		var ctx = contextNode?contextNode:null;
		sExpr += "[1]";
		var nodeList = this.selectNodes(sExpr, ctx);
		if(nodeList.length > 0)
			return nodeList[0];
		else 
			return null;
	};
	Element.prototype.selectSingleNode = function(sExpr)
	{
		var doc = this.ownerDocument;
		if(doc.selectSingleNode)
			return doc.selectSingleNode(sExpr, this);
		else
			throw "SarissaXPathOperationException: Method selectSingleNode is only supported by XML Nodes. (original exception: "+e+")";
	};
}
else if (_SARISSA_IS_IE)
{
	//============================================
	// Section: IE Initialization
	//============================================
	// Add NodeType constants; missing in IE4, 5 and 6
	if(!window.Node)
	{
		var Node = {
			ELEMENT_NODE: 1,
			ATTRIBUTE_NODE: 2,
			TEXT_NODE: 3,
			CDATA_SECTION_NODE: 4,
			ENTITY_REFERENCE_NODE: 5,
			ENTITY_NODE: 6,
			PROCESSING_INSTRUCTION_NODE: 7,
			COMMENT_NODE: 8,
			DOCUMENT_NODE: 9,
			DOCUMENT_TYPE_NODE: 10,
			DOCUMENT_FRAGMENT_NODE: 11,
			NOTATION_NODE: 12
		}
	}
	// for XSLT parameter names
	_SARISSA_IEPREFIX4XSLPARAM = "xsl:";
	// used to store the most recent ProgID available out of the above
	var _SARISSA_DOM_PROGID = "";
	var _SARISSA_XMLHTTP_PROGID = "";
	// used to pick most recent ProgIDs
	function pickRecentProgID(idList)
	{
		// found progID flag
		var bFound = false;
		for (var i=0; i < idList.length && !bFound; i++)
		{
			try
			{
				var oDoc = new ActiveXObject(idList[i]);
				o2Store = idList[i];
				bFound = true;
			}
			catch (objException)
			{
				// trap; try next progID
			}
		}
		if (!bFound)
			throw "Sarissa_Exception: Could not retreive a valid progID of Class: " + idList[idList.length - 1]+". (original exception: "+e+")";
		idList = null;
		return o2Store;
	};
	// store proper progIDs
	_SARISSA_DOM_PROGID = pickRecentProgID(["Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XmlDom"]);
	_SARISSA_XMLHTTP_PROGID = pickRecentProgID(["Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"]);
	// we dont need this anymore
	pickRecentProgID = null;
	//============================================
	// Section: Factory methods (IE)
	//============================================
	// Factory method, returns a DOMDocument suitable for IE
    Sarissa.getDomDocument = function(sUri, sName)
    {
		var oDoc = new ActiveXObject(_SARISSA_DOM_PROGID);
		// if a root tag name was provided, we need to load it in the DOM object
		if (sName)
		{
			// if needed, create an artifical namespace prefix the way Moz does
			if (sUri)
			{
				oDoc.loadXML("<a" + _sarissa_iNsCounter + ":" + sName + " xmlns:a" + _sarissa_iNsCounter + "=\"" + sUri + "\" />");
				// don't use the same prefix again
				++_sarissa_iNsCounter;
			}
			else
				oDoc.loadXML("<" + sName + "/>");
		}
		return oDoc;
    };
	// Factory method, returns an IXMLHTTPRequest object 
	// AFAIK, the object behaves exactly like 
	// Mozilla's XmlHttpRequest
	Sarissa.getXmlHttpRequest = function()
	{
		return new ActiveXObject(_SARISSA_XMLHTTP_PROGID);
	};
}
// Factory Class
function Sarissa(){}
// Common factory method, used to set xslt parameters.
// TODO: figure out how to implement support for both Mozilla's and IE's 
// XSL Processor objects to improove performance for reusable stylesheets.
// @param oXslDoc the target XSLT DOM Document
// @param sParamName the name of the XSLT parameter
// @param sParamValue the value of the XSLT parameter
// @return whether the parameter was set succefully
Sarissa.setXslParameter = function(oXslDoc, sParamQName, sParamValue)
{
	try
	{
		var params = oXslDoc.getElementsByTagName(_SARISSA_IEPREFIX4XSLPARAM+"param");
		var iLength = params.length;
		var bFound = false;
		var param;
		
		if(sParamValue)
		{
			for(i=0; i < iLength && !bFound;i++)
			{
				// match a param name attribute with the name given as argument
				if(params[i].getAttribute("name") == sParamQName)
				{
					param = params[i];
					// clean up the parameter
					while(param.firstChild)
						param.removeChild(param.firstChild);
					if(!sParamValue || sParamValue == null)
					{
						// do nothing; we've cleaned up the parameter anyway
					}
					// if String
					else if(typeof sParamValue == "string")
					{ 
						param.setAttribute("select", sParamValue);
						bFound = true;
					}
					// if node
					else if(sParamValue.nodeName)
					{
						param.removeAttribute("select");
						param.appendChild(sParamValue.cloneNode(true));
						bFound = true;
					}
					// if NodeList
					else if (sParamValue.item(0)
						&& sParamValue.item(0).nodeType)
					{
						for(j=0;j < sParamValue.length;j++)
						if(sParamValue.item(j).nodeType) // check if this is a Node
							param.appendChild(sParamValue.item(j).cloneNode(true));
						bFound = true;
					}
					// if Array or IE's IXMLDOMNodeList
					else
						throw "SarissaTypeMissMatchException in method: Sarissa.setXslParameter. (original exception: "+e+")";
				}
			}
		}
		return bFound;
	}
	catch(e)
	{
		throw e;
		return false;
	}
}
// EOF


