export function random(min: number, max: number): number
{
    return Math.floor(Math.random() * (max - min) + min);
}

export function randomInt(min: number, max: number): number
{
    var absMin = Math.abs(min);
    var absMax = Math.abs(max);

    var rand = Math.random();

    var output:number;

    if (min < 0 && max >= 0)
    {
        output = Math.floor(rand * (max + absMin) - absMin);
    }
    else if (min < 0 && max < 0)
    {
        output = Math.floor(rand * (absMin - absMax) + absMax) * -1;
    }
    else 
    {
        output = Math.floor(rand * (max - min + 1) + min);
    }

    return output;
}