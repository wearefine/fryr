describe('Fryr', function() {
  var fry;
  function callbackFunction(params) {
    return params;
  }

  beforeEach(function() {
    window.location.hash = '';
    fry = new Fryr(callbackFunction);
  });

  describe('.update()', function() {

    it('should add key when key is nonexistent', function() {
      fry.update('character', 'nemo');

      expect(window.location.hash).toEqual('#?character=nemo');
    });

    it('should append key when hash is not blank', function() {
      window.location.hash = '#?location=dentist';
      fry.update('character', 'nemo', false);

      expect(window.location.hash).toEqual('#?location=dentist&character=nemo');
    });

    it('should append key when hash is not blank and the first key\'s value has multiple attributes', function() {
      window.location.hash = '#?location=eac,dentist';
      fry.update('character', 'nemo');

      expect(window.location.hash).toEqual('#?location=eac,dentist&character=nemo');
    });


    describe('key_is_required=false', function() {

      it('should remove key when value is blank', function() {
        window.location.hash = '#?character=nemo';
        fry.update('character', '', false);

        expect(window.location.hash).toEqual('');
      });

      it('should remove value when value has two attributes and value is first', function() {
        window.location.hash = '#?character=nemo,marlin';
        fry.update('character', 'nemo', false);

        expect(window.location.hash).toEqual('#?character=marlin');
      });

      it('should remove value when value has two attributes and value is last', function() {
        window.location.hash = '#?character=marlin,nemo';
        fry.update('character', 'nemo', false);

        expect(window.location.hash).toEqual('#?character=marlin');
      });

      it('should remove value when value has multiple attributes and value is first', function() {
        window.location.hash = '#?character=nemo,marlin,dory';
        fry.update('character', 'nemo', false);

        expect(window.location.hash).toEqual('#?character=marlin,dory');
      });

      it('should remove value when value has multiple attributes and value is in the middle', function() {
        window.location.hash = '#?character=marlin,nemo,dory';
        fry.update('character', 'nemo', false);

        expect(window.location.hash).toEqual('#?character=marlin,dory');
      });

      it('should remove value when value has multiple attributes and value is at the end', function() {
        window.location.hash = '#?character=marlin,dory,nemo';
        fry.update('character', 'nemo', false);

        expect(window.location.hash).toEqual('#?character=marlin,dory');
      });

      describe('has preceeding key', function() {

        it('should remove key when value is blank', function() {
          window.location.hash = '#?location=eac&character=nemo';
          fry.update('character', '', false);

          expect(window.location.hash).toEqual('#?location=eac');
        });

        it('should remove value when value has two attributes and value is first', function() {
          window.location.hash = '#?location=eac&character=nemo,marlin';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin');
        });

        it('should remove value when value has two attributes and value is last', function() {
          window.location.hash = '#?location=eac&character=marlin,nemo';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin');
        });

        it('should remove value when value has multiple attributes and value is first', function() {
          window.location.hash = '#?location=eac&character=nemo,marlin,dory';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin,dory');
        });

        it('should remove value when value has multiple attributes and value is in the middle', function() {
          window.location.hash = '#?location=eac&character=marlin,nemo,dory';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin,dory');
        });

        it('should remove value when value has multiple attributes and value is at the end', function() {
          window.location.hash = '#?location=eac&character=marlin,dory,nemo';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?location=eac&character=marlin,dory');
        });

      });

      describe('has trailing key', function() {

        it('should remove key when value is blank', function() {
          window.location.hash = '#?character=nemo&location=eac';
          fry.update('character', '', false);

          expect(window.location.hash).toEqual('#?location=eac');
        });

        it('should remove value when value has two attributes and value is first', function() {
          window.location.hash = '#?character=nemo,marlin&location=eac';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?character=marlin&location=eac');
        });

        it('should remove value when value has two attributes and value is last', function() {
          window.location.hash = '#?character=marlin,nemo&location=eac';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?character=marlin&location=eac');
        });

        it('should remove value when value has multiple attributes and value is first', function() {
          window.location.hash = '#?character=nemo,marlin,dory&location=eac';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?character=marlin,dory&location=eac');
        });

        it('should remove value when value has multiple attributes and value is in the middle', function() {
          window.location.hash = '#?character=marlin,nemo,dory&location=eac';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?character=marlin,dory&location=eac');
        });

        it('should remove value when value has multiple attributes and value is at the end', function() {
          window.location.hash = '#?character=marlin,dory,nemo&location=eac';
          fry.update('character', 'nemo', false);

          expect(window.location.hash).toEqual('#?character=marlin,dory&location=eac');
        });

      });

    });

    describe('key_is_required=true', function() {

      it('should keep key when value is blank', function() {
        window.location.hash = '#?character=nemo';
        fry.update('character', '', true);

        expect(window.location.hash).toEqual('#?character=');
      });

    });


  });

  describe('.append()', function() {

    describe('key_is_required=false', function() {

      it('should add key when key is nonexistent', function() {
        fry.append('character', 'nemo');

        expect(window.location.hash).toEqual('#?character=nemo');
      });

      it('should add value when value is existent', function() {
        window.location.hash = '#?character=marlin';
        fry.append('character', 'nemo');

        expect(window.location.hash).toEqual('#?character=marlin,nemo');
      });

    });

  });

  describe('.parse()', function() {

    it('should return hash as a key/value JSON object', function() {
      window.location.hash = '#?character=nemo&location=eac';

      var params = fry.parse();

      expect(params).toEqual({ 'character' : 'nemo', 'location' : 'eac'});
    });

  });

  describe('.param()', function() {

    it('should return the value of a param given a key', function() {
      window.location.hash = '#?character=nemo';

      expect(fry.param('character')).toEqual('nemo');
    });

  });

  describe('.paramPresent()', function() {

    it('should return true for an existent param given a key', function() {
      window.location.hash = '#?character=nemo';

      fry.parse();

      expect(fry.paramPresent('character')).toEqual(true);
    });

    it('should return false for an existent param given a key', function() {
      window.location.hash = '#?character=nemo';

      fry.parse();

      expect(fry.paramPresent('location')).toEqual(false);
    });

  });

  describe('.params', function() {

    it('should return single-value params', function() {
      window.location.hash = '#?character=nemo&location=eac';

      fry.parse()

      expect(fry.params).toEqual({'character' : 'nemo', 'location' : 'eac'});
    });

    it('should return multiple-value params', function() {
      window.location.hash = '#?character=nemo,marlin,dory&location=eac';

      fry.parse()

      expect(fry.params).toEqual({'character' : 'nemo,marlin,dory', 'location' : 'eac'});
    });

  });

  describe('.convert()', function() {

    it('should convert single object to string', function() {
      var obj = { 'character' : 'nemo' };
      var str = fry.convert(obj);

      expect(str).toEqual('?character=nemo');
    });

    it('should convert object to string', function() {
      var obj = { 'character' : 'nemo', 'location' : 'dentist' };
      var str = fry.convert(obj);

      expect(str).toEqual('?character=nemo&location=dentist');
    });

    it('should convert object with an array to string', function() {
      var obj = { 'character' : ['nemo', 'dory', 'marlin'], 'location' : 'dentist' };
      var str = fry.convert(obj);

      expect(str).toEqual('?character=nemo,dory,marlin&location=dentist');
    });

  });

  describe('.merge()', function() {

    it('should replace entire hash when replace_all is true', function() {
      window.location.hash = '#?location=dentist';
      var obj = { 'character' : 'nemo' };
      var str = fry.merge(obj, true);

      expect(str).toEqual('?character=nemo');
    });

    it('should replace only specific hash values', function() {
      window.location.hash = '#?location=dentist&character=nemo';
      var obj = { 'character' : 'dory' };
      var str = fry.merge(obj);

      expect(str).toEqual('?character=dory&location=dentist');
    });

  });

  describe('.destroy()', function() {
    it('should remove the hashchange listener', function() {
      var hash_fires = 0;

      fry = new Fryr(function(params) {
        hash_fires += 1;
      });

      // Ensure custom callback works
      window.location.hash = '#?just_keep=swimming';
      expect(hash_fires).toEqual(1);

      fry.destroy();

      // Ensure hash was removed
      expect(window.location.hash).toEqual('');

      // Ensure custom callback did not fire
      window.location.hash = '#?just_keep=floating';
      expect(hash_fires).toEqual(1);
    });

    it('should remove the hashchange listener but keep the hash string when retain_hash is true', function() {
      window.location.hash = '#?just_keep=swimming';

      fry.destroy(true);

      // Ensure hash was maintained
      expect(window.location.hash).toEqual('#?just_keep=swimming');
    });
  });


});
