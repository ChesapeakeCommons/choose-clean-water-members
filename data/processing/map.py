import json

with open('coalition.json', 'r') as source, open('mapped.json', 'wb') as target:

    features = json.load(source)

    l = []

    for feature in features:

        d = {}

        for k,v in feature.iteritems():

            keys = k.split('/')

            if 'location' in k or 'action' in k:

                if len(keys) == 2:

                    if keys[0] not in d:

                        d[keys[0]] = {}

                        d[keys[0]][keys[1]] = v

                    else:

                        d[keys[0]][keys[1]] = v

                else:

                    if keys[2] == '0':

                        d[keys[0]]['address_lines'] = [v]

                    else:

                        if keys[1] not in d[keys[0]]:

                            d[keys[0]][keys[1]] = {}

                            d[keys[0]][keys[1]][keys[2]] = v

                        else:

                            d[keys[0]][keys[1]][keys[2]] = v

            else:

                d[k] = v

        l.append(d)

    json.dump(l, target, indent=4, sort_keys=True)

