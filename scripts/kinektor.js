const kinektor = extendContent(UnitType, "kinektor", {});
kinektor.constructor = () => extend(UnitEntity, {});
//force field: radius, regen, max, cooldown
const ability = new JavaAdapter(ForceFieldAbility, {}, 28, 0.1, 200, 360);

kinektor.abilities.add(ability);
