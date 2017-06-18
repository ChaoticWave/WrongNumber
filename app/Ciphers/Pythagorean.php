<?php namespace ChaoticWave\WrongNumber\Ciphers;

class Pythagorean extends BaseCipher
{
    //******************************************************************************
    //* Constants
    //******************************************************************************

    /** @inheritdoc */
    const SYSTEM = 'pythagorean';

    /**
     * @param string $character
     * @param int    $position
     *
     * @return int
     */
    protected function getCharacterValue($character, $position = 0)
    {
        static $_options = ['K' => 11, 'S' => 10, 'V' => 22];

        $_value = parent::getCharacterValue($character, $position);

        //  Save additional optional value
        if (array_key_exists($character, $_options)) {
            $this->optional += $_options[$character];
        }

        return $_value;
    }
}
