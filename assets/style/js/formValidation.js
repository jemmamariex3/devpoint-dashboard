function textCounter(field,counter,maxlimit)
{
 var countfield = document.getElementById(counter);
if (field.value.length > maxlimit) {
    field.value = field.value.substring(0, maxlimit);
    return false;
} else {
    countfield.value = maxlimit - field.value.length;
}

}