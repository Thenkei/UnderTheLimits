<p align="center">
  <img width="150" src="https://dev.underthelimits.fr/public/images/UTL_Logo.png" alt="UTL logo">
</p>
<div align="center">
  An open-source and horrible french card game
</div>

 - [Dev env](#Dev)
 - [Deploying on K8S](#K8S)
 - [FAQ](#FAQ)

## Dev 

```bash
git clone https://github.com/Thenkei/UnderTheLimits
cd UnderTheLimits
node server/scripts/populate-dev.js
yarn start:dev
```

## K8S

All the files needed to run UTL on K8S can be found in the [infra folder](https://github.com/Thenkei/UnderTheLimits/tree/master/infra).
Be aware that K8S related files are __NOT__ production ready.
`PORT` variable can be customized to any of your wishes
`SHA1` is mainly used to keep a trace of the currently deployed version

Most of the configuration related to [traefik](https://traefik.io/) should be updated to match your configuration

## FAQ

> Is there a demo ?

[Here](https://dev.underthelimits.fr)

> Is there tests ?

No. We want to deploy an online, playable version before deploying some kind of production version

> Is there a roadmap ?

Yes and no. You can find [here](https://github.com/Thenkei/UnderTheLimits/projects) stuff we currently plan to work on. 

> Why is the code so horrible ?

We didn't planish most of the stuff we did. If you find anything so aweful it hurts you, you can fork it and PR are welcome !

