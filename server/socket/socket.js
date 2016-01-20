'use strict';

var express = require('express');
var server;
var io = require('socket.io')();
var port = process.env.PORT || 3000;
var exports = module.exports;

var PatientQueue = require('../models/PatientQueue');

/********** Socket IO Module **********/
exports.createServer = function(io_in) {
    io = io_in;

    /*
     * This handles the 'connection' event, which is send when the user is
     * trying to connect a socket.
     *
     * Note that when the connection is established for that client,
     * the '_admin_id' needs to be set so that the client can be added to the
     * room and notified when changes are being made.
     */
    io.on('connection', function (socket) {
        // Get the ID of the admin that has connected.
        var adminID;

        //get was deprecated so this part was commented out
        /*socket.get('_admin_id', function (err, _admin_id) {
            socket.join(_admin_id);
        });*/
        socket.emit('request_id');
        socket.on('_admin_id', function(data) {
            adminID = data._admin_id;
            console.log('user connected to ' + adminID);
            socket.join(adminID);
            PatientQueue.findOne({_admin_id: adminID}, function(err, q){
                if(err)
                    throw(err);
                else
                    exports.notifyNewQueue(admin, q ? q : []);
            });
        });

        socket.on('request_queue', function(data) {
            PatientQueue.findOne({_admin_id : adminID}, function(err, q){
                if(err)
                    throw(err);
                else
                    exports.notifyNewQueue(adminID, q ? q : []);
            });
        });

        socket.on('disconnect', function() {
            console.log('user disconnected from ' + adminID);
        });

        socket.on('patient_removed', function(data) {
            if(adminID == null) socket.emit('request_id');
            console.log(data.patientName);
            if(!data.patientName) return;
            console.log("remove name",data.patientName);
            var patient = {
                _admin_id: adminID,
                name: data.patientName
            };
            var queue = {
                _admin_id: adminID,
                $pull: {"patients": patient}
            };
            PatientQueue.findOneAndUpdate(
                {_admin_id: adminID},
                queue,
                {safe: true, upsert: true},
                function(err, q) {
                    if(err)
                        throw(err)

                }
            );
            io.to(adminID).emit('queue_updated', data.queue);

        });

        socket.on('patient_added', function(patient) {
            if(adminID == null) socket.emit('request_id');
            io.to(adminID).emit('queue_updated', patient);
        });

    });
    return server;
};

/*
 * A function that allows you to notify all clients that
 * the queue has been updated.
 *
 * The client side needs to be listening for the 'queue_updated' event. When
 * this event is triggered, the client side can retrieve the whole queue of
 * patients to reflect the changes.
 */
exports.notifyNewQueue = function(adminID, queue) {
    io.to(adminID).emit('queue_updated', queue);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been added to the queue.
 */
exports.notifyPatientAdded = function(adminID, patient) {
    io.to(adminID).emit('patient_added', patient);
};

/*
 * A function that allows you to notify all clients that
 * a patient has been removed from the queue.
 */
exports.notifyPatientRemoved = function(adminID, patient) {
    io.to(adminID).emit('patient_removed', patient);
};

/*
 * Set up a custom namespace.
 *
 * On the client side get the socket as follows to robobetty:
 *   var socket = io('/patientQueue');
 */
var nsp = io.of('/patientQueue');

// To be used with authorization.
// io.set('authorization', socketioJwt.authorize({
//   secret: jwtSecret,
//   handshake: true
// }));