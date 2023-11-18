# JavaScript/TypeScript client SDK for KitRtc

<!--BEGIN_DESCRIPTION-->
`KitRtc` is a powerful library designed to simplify the integration of WebRTC into applications developed with Angular. We make it easy to create real-time communication experiences, allowing developers to easily incorporate audio and video capabilities into their web applications.

- `Main Features`:
Easy Integration: Easily implement real-time communication without the complexity of configuring WebRTC from scratch.

- `Angular Components`: Take advantage of Angular's customizable components to build modern, interactive user interfaces.

- `Video Conferencing Support`: Facilitates the creation of video conferencing rooms with advanced control and management functions.

- `Advanced Customization`: Adapt the user interface and functionalities according to the specific needs of your application.

- `Cross-platform Compatibility`: Ensures a fluid experience on different browsers and devices.

- `Security and Privacy`: Implement security measures to protect communications and guarantee user privacy.

- `Comprehensive Documentation`: We provide detailed documentation and usage examples to speed up the development process.


# Our vision and mission
`KitRTC` is in constant evolution and improvements so there may be uncontrolled errors and/or unexpected behaviors, with your help we will be able to improve it even more.

There are still many functions and/or features that we are working on little by little, below we present some aspects that we currently have on our development list:

- Signaling change to `SSR` (Great improvement).
- Better room control (Password, Token, Tracks, Participants, Etc).
- Tokenized and protected `API` to interact with rooms.
- Room `recording`.
- Dynamic Video/Audio Quality
- Integration with Cloud Storage Platforms
- `Translation` and `Subtitles` in Real Time (Great improvement)
- Redis implementation.
- Implementation of Scalability for rooms with more participants (Hand in hand with SSR)


Thank you for all the support and for using our library, don't forget to join our [SLACK](https://join.slack.com/t/kitrtc-webrtc/shared_invite/zt-279e5jjbm-yFxQZl~ymHsZM8vXUXXBzg).
<!--END_DESCRIPTION-->

## Docs

Docs and guides at [https://docs.nillapp.com/kitrtc](https://docs.nillapp.com/kitrtc)

[SDK reference](https://docs.nillapp.com/kitrtc/)

[Slack](https://join.slack.com/t/kitrtc-webrtc/shared_invite/zt-279e5jjbm-yFxQZl~ymHsZM8vXUXXBzg)

## Installation


### NPM

```shell
npm install kitrtcjs --save
```

## Importing

Import service and components from the package in app.module.ts:

```typescript
//Import service and module
import { KitRtc, KitRtcModule } from 'KitRtcJs';

@NgModule({
  ...
  imports: [
    ...
    KitRtcModule
  ],
  providers: [
    ...
    KitRtc
  ],
  ...
})
```



## Usage

Examples below are in TypeScript, if using JS/CommonJS imports replace import with:

```typescript
import { KitRtc } from 'KitRtcJs';

...
//For test purposes in development environment
server: string = "https://localhost:3000";

constructor(
  private kitRtc: KitRtc
){

  //Connect
  this.connect();
  
}
...

async connect(): Promise<void>{
  const connect = await this.kitRtc.connect(this.server);
  if (connect) {
    console.log("Connected to server");
    const joinRoom = await this.kitRtc.room.join("roomName");
    if (joinRoom) {
      console.log("Joined to room");
    }
  }
}
...
```

### Publish video & audio in a room


```typescript

//Connect to server
await this.kitRtc.connect(this.server);

//Join to room
await this.kitRtc.room.join("roomName");

//Publish video & audio
await this.kitRtc.localParticipant.localTracks.enableCameraAndMic();



//Set events 
this.kitRtc.onRemoteMedia.subscribe(([participant: Participant, track: Track]) => {
  console.log('onRemoteMedia', participant, track);
  //Source append automatically using component: <kitrtc-participants />
});

this.kitRtc.onRemoveRemoteMedia.subscribe(([participant: Participant, track: Track]) => {
  console.log('onRemoveRemoteMedia', participant, track);
  //Source remove automatically using component: <kitrtc-participants />
});

this.kitRtc.onParticipantConnected.subscribe((participant: Participant) => {
  console.log('onParticipantConnected', participant);
});

this.kitRtc.onParticipantDisconnected.subscribe((participant: Participant) => {
  console.log('onParticipantDisconnected', participant);
});

this.kitRtc.onRemoveLocalMedia.subscribe(([participant: Participant, track: Track]) => {
  console.log('onRemoveLocalMedia', participant, track);
});
```


### Automatic participant management

As part of our principles and initial project idea, you have some components available to facilitate user control, error control and quick use.

```html
<!-- Self-management of the room participants. -->
<kitrtc-participants />

<!-- Self-management local participant. -->
<kitrtc-local-participant />

<!-- Self-management of local media -->
<kitrtc-media-controls />
```

### Creating a track after joining a room

In some cases, it may be useful to create a track before creating a room.


```typescript
const tracks = await this.kitRtc.localParticipant.localTracks.createLocalTracks({
  audio: true,
  video: true,
});
```

### Publish tracks manually

You can publish a track whenever you need it

```typescript
await this.kitRtc.localParticipant.localTracks.publish();

// or unpublish
await this.kitRtc.localParticipant.localTracks.unpublish(true);
```

#### Audio auto-play policy

By default, browsers do not allow sound to be played automatically without user interaction, `KitRtc` automatically controls these errors in a `clean` and `non-invasive` way.

```html
<!-- If you use this component KitRtc takes care of everything :). -->
<kitrtc-participants />
```

### Configuring logging

Debugging is very simple with KitRtc, just adding the following line of code will activate all the notices, warnings and errors logs.

```ts
this.kitRtc.isDebug = true;
```
You can change the behavior of the logs at any time.


## Browser Support

| Browser         | Desktop OS            | Mobile OS |
| --------------- | --------------------- | --------- |
| Firefox         | Windows, macOS, Linux | Android   |
| Chrome          | Windows, macOS, Linux | Android   |
| Safari          | macOS                 | iOS       |
| Edge (Chromium) | Windows, macOS        |           |

We continue debugging and adding more functions to further enrich `KitRtc`, we hope to make it one of the best free webrtc libraries, help us by [supporting](https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3RE7256071613023YMVLG64Q) us and sharing our work.

* Also with your [support](https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3RE7256071613023YMVLG64Q) we offer support and we will increase/improve the operation






## Plan-based usage licenses

We want to clarify that `KitRtc` is completely free to use, we want to offer the best tool for real-time communication with `WebRTC`, however to achieve this we need to invest a lot of time in debugging and improving `KitRtc` for that we seek the support of the community by offering some plans to reward directly to those who support us.

Those who do not support us will still receive updates and support.


| Plan          | Free                  | Basic                  | Premium                |
|---------------|-----------------------|------------------------|------------------------|
| Participants  | Limited (2 per room)   | Limited (4 Per room)              | Unlimited              |
|               | Short sessions         | Without time limit.     | Unlimited              |
| Features      | Unlimited             | Unlimited              | Unlimited              |
| Encrypted communication      | Yes             | Yes              | Yes              |
| Recording      | No             |      To consult price.         | To consult price.              |
| Support       | GitHub (Issues)        | Email                  | Support 24/7           |
| Personalization| Watermark             | Basic interface        | Total control          |
| Components    | Yes                   | Yes                    | Yes                    |
| IceServers    | Shared       | Shared      | Shared    |
| Signaling | Shared  | Own instance  | Own instance|
| Price         | Free                | [9.99€/m](https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3RE7256071613023YMVLG64Q)                | [29.99€/m](https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3RE7256071613023YMVLG64Q)                |

#### Prices not included VAT.

By using `KitRtc` you accept our policies, terms and conditions as well as the use in accordance with the aforementioned plans, `we will not limit you directly`, we `trust` your `honesty` and your support!
