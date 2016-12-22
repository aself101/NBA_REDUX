



/*
  Unused Promised JQuery Ajax
  function ajax(method, id, data) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: method,
        url: `${ROOT_URL}/profile?${id}`,
        dataType: 'json',
        data: data,
        headers: { authorization: localStorage.getItem('token') },
        beforeSend: function(xhr) {
          console.log(`In beforeSend: ${xhr}`);
          return;
        },
        success: function(data) {
          resolve(data);
        },
        error: function(xhr, status, err) {
          reject(err.toString());
        },
        complete: function() {

        }
      });
    });
  }
*/























/* END */
