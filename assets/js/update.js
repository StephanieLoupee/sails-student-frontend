/**
 * Use the jQuery Validate and the bootstrap-select plugin to enhance this page
 *
 * Here's what this you will need to do:
 *
 * 1. When the page is loaded all form fields should be disabled except
 *    for the dropdown to select a student
 *
 * 2. Using the bootstrap-selct plugin render dropdown on the page
 *
 * 3. Use the live search functionality to make the dropdown searchable
 *
 * 4. Add the user glyphicons next to each student in the list
 *
 * 6. Add a menu header to the dropdown
 *
 * 7. Customize further with anything you find intersting
 *
 * 8. When an student is selected the form fields should be enabled
      and populated with the data for the selected student
 *
 * 9. Use jQuery validate and add validation to the form with the following requirements
 *    First Name - required, at least 2 characters
 *    Last Name  - required, at least 2 characters
 *	  start_date - make sure date is yyyy-mm-dd
 *	  ADD any other validation that makes you happy
 *
 * 10. Make the color of the error text red
 *
 *
 *
 * Here's the documentation you need:
 * https://jqueryvalidation.org/validate/
 * https://jqueryvalidation.org/documentation/#link-list-of-built-in-validation-methods
 * https://silviomoreto.github.io/bootstrap-select/
 * https://silviomoreto.github.io/bootstrap-select/examples/
 * http://getbootstrap.com/components/#glyphicons
 * https://api.jquery.com/jQuery.get/
 * http://stackoverflow.com/questions/9807426/use-jquery-to-re-populate-form-with-json-data
 *
 */

(function() {

  let first_name = $("#first_name");
  let last_name = $("#last_name");
  let start_date = $("#start_date");
  let gpa = $("#gpa");
  let sat = $("#sat");
  let major_id = $("#major_id");
  let student_id = $("#student_id");

  $(function(){

        $("#updateStudentForm :input").prop("disabled", true);

        $("#studentId").change(function() {
          $("#updateStudentForm :input").prop("disabled", false);
        })


        $("#studentId").change(function() {
          let selectedId = $(this).val();
          console.log(selectedId);

          let url = ("http://localhost:1337/student" + "/" + selectedId);
          console.log(url);

            $.get(url, function(data) {
                console.log(data);
                first_name.val(data.first_name);
                last_name.val(data.last_name);
                start_date.val(data.start_date);
                gpa.val(data.gpa);
                sat.val(data.sat);
                major_id.val(data.major_id);
                student_id.val(data.student_id);
            })
         })

        $("#updateStudentForm").validate({
        errorClass: "text-danger",
        rules: {
          // simple rule, converted to {required:true}
          first_name: {
           required: true,
           minlength: 2
          },
          last_name: {
           required: true,
           minlength: 2
          },
          start_date: {
           dateISO: true
          },
          major_id: {
            required: true
          }
        },

        messages: {
          last_name: {
           required: "We need your last name to retrieve your records",
           minlength: "At least 2 characters required!"
          },
          start_date: {
           dateISO: "Please format your date YYYY-MM-DD"
          }
        }


      })

 })
})();
