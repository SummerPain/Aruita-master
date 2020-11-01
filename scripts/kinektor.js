const kinektor = extendContent(UnitType, "kinektor", {});
kinektor.constructor = () => extend(UnitEntity, {});
//force field: radius, regen, max, cooldown
const ability = new JavaAdapter(ForceFieldAbility, {}, 30, 0.2, 400, 240);

kinektor.abilities.add(ability);
