sas
    .factory('Notifi', function () {
        return {
            _error: function (sms, from, align) {
                $.notify({
                    icon: "add_alert",
                    message: sms

                }, {
                        type: 'danger',
                        timer: 2000,
                        placement: {
                            from: from,
                            align: align
                        }
                    });
            },
            _success: function (sms, from, align) {
                $.notify({
                    icon: "add_alert",
                    message: sms

                }, {
                        type: 'success',
                        timer: 2000,
                        placement: {
                            from: from,
                            align: align
                        }
                    });
                // $.playSound('assets/sound/circles.m4r');
            },
            _notifi: function (sms, from, align) {
                $.notify({
                    icon: "info",
                    message: sms

                }, {
                        type: 'warning',
                        timer: 1800000,
                        placement: {
                            from: from,
                            align: 'center'
                        }
                    });
                $.playSound('./circles.m4r');
            }
        }
    });