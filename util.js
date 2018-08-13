var isIn = function(str1, str2) // returns true if str2 is found in str1 - case insensitive
{
	var s1 = str1.toLowerCase();
	var s2 = str2.toLowerCase();
	
	if (s1.indexOf(s2)>=0) return(true);
	
	return(false);
};

var isIn2 = function(str1, str2, str3) // returns true if str2 AND str3 are found in str1 - case insensitive
{
	var s1 = str1.toLowerCase();
	var s2 = str2.toLowerCase();
	var s3 = str3.toLowerCase();
	
	if ( (s1.indexOf(s2)>=0) && (s1.indexOf(s3)>=0) ) return(true);
	
	return(false);
};

var isIn3 = function(str1, str2, str3, str4) // returns true if str2 AND str3 are found in str1 - case insensitive
{
	var s1 = str1.toLowerCase();
	var s2 = str2.toLowerCase();
	var s3 = str3.toLowerCase();
	var s4 = str4.toLowerCase();
	
	if ( (s1.indexOf(s2)>=0) && (s1.indexOf(s3)>=0) && (s1.indexOf(s4)>=0) ) return(true);
	
	return(false);
};

var isIn4 = function(str1, str2, str3, str4, str5) // returns true if str2, str3, str4 AND str5 are found in str1 - case insensitive
{
	var s1 = str1.toLowerCase();
	var s2 = str2.toLowerCase();
	var s3 = str3.toLowerCase();
	var s4 = str4.toLowerCase();
	var s5 = str5.toLowerCase();
	
	if ( (s1.indexOf(s2)>=0) && (s1.indexOf(s3)>=0) && (s1.indexOf(s4)>=0) && (s1.indexOf(s5)>=0) ) return(true);
	
	return(false);
};

var showFilled = function(value) 
{
	return (value > 9) ? "" + value : "0" + value;
};

module.exports = 
{
	isIn: isIn,
	isIn2: isIn2,
	isIn3: isIn3,
	isIn4: isIn4,
	showFilled: showFilled
};

console.log('isIn("kissa","ss")='+isIn("kissa","ss"));
console.log('showFilled(5)='+showFilled(5));