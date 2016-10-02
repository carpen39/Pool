<?php

class ELOCalculator
{
    const WIN = 1;
    const LOSS = 0;
    const DRAW = 0.5;
    private $_kFactor;
    private $_expectedA;
    private $_expectedB;
    private $_newRatingA;
    private $_newRatingB;

    public function  __construct($ratingA, $ratingB, $scoreA, $scoreB, $kFactor = 16)
    {
        $this->_kFactor = $kFactor;
        $this->_expectedA = $this->_makeExpected($ratingB, $ratingA);
        $this->_expectedB = $this->_makeExpected($ratingA, $ratingB);
        $this->_newRatingA = $this->_makeNewRating($ratingA, $scoreA, $this->_expectedA);
        $this->_newRatingB = $this->_makeNewRating($ratingB, $scoreB, $this->_expectedB);
    }

    private function _makeExpected($x, $y)
    {
        return 1 / (1 + (pow(10, ($x - $y) / 400)));
    }

    private function _makeNewRating($x, $y, $z)
    {
        return $x + ($this->_kFactor * ($y - $z));
    }

    public function getExpected()
    {
        return [
            'a' => $this->_expectedA,
            'b' => $this->_expectedB
        ];
    }

    public function getRatings()
    {
        return [
            'a' => $this->_newRatingA,
            'b' => $this->_newRatingB
        ];
    }
}

?>