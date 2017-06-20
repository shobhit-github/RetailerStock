"use strict";
/**
 * Storing multiple constant values inside of an object
 * Keep in mind the values in the object mean they can be modified
 * Which makes no sense for a constant, use wisely if you do this
 */

app.controller('chatCtrl', ['$scope', 'Pubnub', '$token', '$rootScope',
    function chatCtrl($scope, Pubnub, $token, $rootScope) {

        $scope.channel = 'Channel-vg2otkim4';
        $scope.messages = [];

        $scope.uuid = $token.getFromLocal().split(' ')[1];



        Pubnub.init({
            publish_key: 'pub-c-78a030e7-1460-4af8-a89c-972b1b076826',
            subscribe_key: 'sub-c-c7efcfde-4ade-11e7-ab90-02ee2ddab7fe',
            uuid: $scope.uuid,
            ssl: true
        });


        // Send the messages over PubNub Network
        $scope.sendMessage = function (event) {


            // Don't send an empty message
            if (!$scope.messageContent || $scope.messageContent === '') {
                return;
            }


            Pubnub.publish({
                channel: $scope.channel,
                message: {
                    content: { first_name: $rootScope.user.firstname,  lastname: $rootScope.user.lastname, avatar: $rootScope.user.picture, chat_message: $scope.messageContent },
                    sender_uuid: $scope.uuid,
                    date: new Date()
                },
                callback: function (m) {
                    console.log(m);
                }
            });
            // Reset the messageContent input
            $scope.messageContent = '';

            event.preventDefault();

        };


        // Subscribing to the ‘messages-channel’ and trigering the message callback
        Pubnub.subscribe({
            channel: $scope.channel,
            triggerEvents: ['callback']
        });


        // Listening to the callbacks
        $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function (ngEvent, m) {

            $scope.$apply(function () {
                $scope.messages.push(m.content)
            });
        });


    }]);